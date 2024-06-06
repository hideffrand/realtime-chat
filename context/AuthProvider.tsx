"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "@/libs/firebase/init";
import { addUser, getUser } from "@/libs/firebase/user";

interface IAuthContext {
  user: IUser | null;
  login: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const newUser = {
        id: result.user.uid,
        username: result.user.displayName || "",
        photoUrl: result.user.photoURL || "/blank_profile.webp",
      };

      await addUser(newUser);

      const fetchedUser = await getUser(result.user.uid);
      if (fetchedUser) setUser(fetchedUser);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const loggedInUser = {
          id: user.uid,
          username: user.displayName as string,
          photoUrl: user.photoURL || "/blank_profile.webp",
        };

        // Check if user is in db
        const fetchedUser = await getUser(user.uid);
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          await addUser(loggedInUser);
          setUser(loggedInUser);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
