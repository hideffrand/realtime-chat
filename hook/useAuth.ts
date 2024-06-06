import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authCtx;
};
