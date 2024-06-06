"use server";

import { db } from "./init";
import { v4 as uuidv4 } from "uuid";
import {
  set,
  ref,
  get,
  child,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { IUser } from "@/types";

export async function addUser(data: IUser) {
  set(ref(db, `users/${data.id}`), {
    id: data.id,
    username: data.username,
    photoUrl: data.photoUrl,
  });
}

export async function getUser(id: string): Promise<IUser | null> {
  const userRef = ref(db, "users/" + id);
  const snapshot = await get(userRef);
  const data = snapshot.val();

  if (data) {
    return {
      id,
      username: data.username,
      photoUrl: data.photoUrl,
    };
  } else {
    return null;
  }
}

export async function getUserByUsername(
  username: string
): Promise<IUser | null> {
  const userRef = ref(db, "users/");
  const snapshot = await get(userRef);
  const data = snapshot.val();

  for (const userId in data) {
    if (data[userId].username === username) {
      return {
        id: userId,
        username: data[userId].username,
        photoUrl: data[userId].photoUrl,
      };
    }
  }

  return null;
}
