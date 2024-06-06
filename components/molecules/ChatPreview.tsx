"use client";

import { useEffect, useState } from "react";
import ProfilePicture from "../atoms/ProfilePicture";
import SubHeading from "../atoms/SubHeading";
import { getUser } from "@/libs/firebase/user";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getDateDifferenceFromDateNow,
} from "@/utils/date";

interface IChatPreview {
  receiverId: string;
  roomId: string;
  lastMessage: any;
}

export default function ChatPreview({
  receiverId,
  roomId,
  lastMessage,
}: IChatPreview) {
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("room");

  const router = useRouter();
  const [receiver, setReceiver] = useState<{
    photoUrl: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    async function fetchReceiver() {
      try {
        const receiverData = await getUser(receiverId);
        setReceiver(receiverData);
      } catch (error) {
        console.error("Error fetching receiver data:", error);
      }
    }

    fetchReceiver();
  }, [receiverId]);

  if (!receiver) {
    return <div>Loading...</div>;
  }

  function handleClick() {
    router.push(`/?section=Chats&room=${roomId}`);
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`relative w-full p-2 flex gap-4 items-center rounded-[6px] hover:bg-gray-light ${
        roomId === roomIdParam ? "bg-gray-light" : ""
      }`}
    >
      <ProfilePicture src={receiver.photoUrl} />
      <div className="flex flex-col items-start w-full">
        <SubHeading text={receiver.username} />
        <p>{lastMessage.text}</p>
      </div>
      <p className="absolute right-2 top-2 text-xs opacity-40">
        {getDateDifferenceFromDateNow(lastMessage.datetime)}
      </p>
    </button>
  );
}
