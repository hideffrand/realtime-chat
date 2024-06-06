"use server";

import { getUserByUsername } from "@/libs/firebase/user";

export async function handleSearch(formData: FormData) {
  const q = formData.get("query") as string;

  if (!q) return null;

  try {
    const users = await getUserByUsername(q);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}
