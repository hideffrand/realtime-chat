"use server";
import { set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/libs/firebase/init";

export async function handleSubmit(formData: FormData) {
  const roomId = formData.get("roomId");
  const text = formData.get("messageInput") as string;
  const userId = formData.get("userId");
  const newId = uuidv4();

  if (text.length === 0 || !roomId || !userId) return;

  try {
    set(ref(db, `rooms/${roomId}/messages/${newId}`), {
      datetime: new Date().toISOString(),
      isEdited: false,
      text: text,
      userId: userId,
    });

    return;
  } catch (error) {
    console.log("Internal Server Error");
    return;
  }
}
