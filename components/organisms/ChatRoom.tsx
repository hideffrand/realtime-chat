"use client";

import { useEffect, useState } from "react";
import { db } from "@/libs/firebase/init";
import { ref, onValue, set } from "firebase/database";
import { toDate } from "@/utils/date";
import { IUser, IMessage } from "@/types";
import ProfilePicture from "../atoms/ProfilePicture";
import { getUser } from "@/libs/firebase/user";
import BubbleChat from "../molecules/ChatBubble";
import { useAuth } from "@/hook/useAuth";
import SubHeading from "../atoms/SubHeading";
import { useSearchParams } from "next/navigation";
import { handleSubmit } from "./action";
import { useRef } from "react";
import Button from "../atoms/Button";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoSendOutline } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";

export default function ChatRoom() {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  const { user } = useAuth();

  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");

  useEffect(() => {
    if (!roomId) {
      setReceiver(null);
      setMessages([]);
      return;
    }
  }, []);

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (const key in data) {
        loadedMessages.push({ id: key, ...data[key] });
      }
      loadedMessages.sort((a, b) => toDate(a.datetime) - toDate(b.datetime));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    const roomsUsersRef = ref(db, `rooms/${roomId}/users`);
    const unsubscribe = onValue(roomsUsersRef, (snapshot) => {
      const data = snapshot.val();
      let receiverId = "";
      for (const key in data) {
        if (data[key] != user?.id) {
          console.log("rec id", data[key]);
          receiverId = data[key];
          break;
        }
      }
      if (receiverId) {
        getUser(receiverId).then((data) => setReceiver(data));
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <>
      <section className="relative w-full h-full bg-gray-normal flex flex-col justify-between">
        <div className="w-full p-5 flex justify-between border-b border-gray-dark">
          <span className="flex gap-4 items-center">
            <ProfilePicture src={receiver?.photoUrl} />
            <SubHeading text={receiver?.username} />
          </span>
          <span className="flex items-center gap-1">
            <Button icon={<IoVideocamOutline />} />
            <Button icon={<IoCallOutline />} />
          </span>
        </div>
        <div
          className="h-full w-full overflow-hidden flex flex-col justify-end bg-center bg-cover bg-[rgb(32,32,32)]"
          style={{
            // backgroundImage: 'url("/chatroom-bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {messages.map((m, i) => (
            <div key={i}>
              <BubbleChat
                message={m.text}
                time={m.datetime}
                role={m.userId === user?.id ? "sender" : "receiver"}
              />
            </div>
          ))}
        </div>
        <div className="w-full px-2 flex justify-between items-center gap-1">
          <Button icon={<BsEmojiSmile />} />
          <Button icon={<ImAttachment />} />
          <form
            ref={formRef}
            action={async (formData) => {
              await handleSubmit(formData);
              formRef.current?.reset();
            }}
            className="w-full p-2 flex border-t border-gray-dark"
          >
            <input
              type="text"
              value={roomId ? roomId : ""}
              name="roomId"
              hidden
            />
            <input type="text" value={user?.id} name="userId" hidden />
            <input
              type="text"
              className="w-full bg-transparent p-2"
              placeholder="Type a message"
              name="messageInput"
            />
            <button type="submit">
              <Button icon={<IoSendOutline />} />
            </button>
          </form>
          <Button icon={<CiMicrophoneOn />} />
        </div>
      </section>
    </>
  );
}
