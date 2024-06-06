"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { db } from "@/libs/firebase/init";
import { ref, onValue } from "firebase/database";
import { toDate } from "@/utils/date";
import Heading from "../atoms/Heading";
import Button from "../atoms/Button";
import SearchBar from "../molecules/SearchBar";
import ChatPreview from "../molecules/ChatPreview";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { IMessage, IUser } from "@/types";
import { useSearch } from "@/hook/useSearch";
import UserSearchResult from "../molecules/UserSearchResult";
import SectionLayout from "../layouts/SectionLayout";

export default function ChatSection() {
  const [chatPreviews, setChatPreviews] = useState<any>([]);
  const { user } = useAuth();
  const { results } = useSearch();

  useEffect(() => {
    const chatRoomsRef = ref(db, "rooms/");
    const unsubscribe = onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val();
      let previews = [];
      for (const roomId in data) {
        const receiverId = data[roomId].users.filter(
          (userId: string) => userId !== user?.id
        );

        if (data[roomId].users.includes(user?.id)) {
          const messages = data[roomId].messages;
          let tempMessages: any = [];
          for (const messageId in messages) {
            tempMessages.push({ ...messages[messageId] });
          }

          tempMessages.sort(
            (a: IMessage, b: IMessage) =>
              toDate(a.datetime) - toDate(b.datetime)
          );

          previews.push({
            roomId,
            ...data[roomId],
            receiverId,
            lastMessage: tempMessages[tempMessages.length - 1],
          });
        }
      }
      setChatPreviews(previews);
    });

    console.log(chatPreviews);
    return () => unsubscribe();
  }, [user]);

  return (
    <SectionLayout>
      <div className="flex justify-between items-center">
        <Heading text="Chats" />
        <span className="flex items-center">
          <Button icon={<FaRegEdit />} />
          <Button icon={<IoFilter />} />
        </span>
      </div>
      <SearchBar />
      {results.length > 0 &&
        results.map((r: IUser, i: number) => (
          <div key={i}>
            <UserSearchResult
              photoUrl={r.photoUrl}
              username={r.username}
              id={r.id}
            />
          </div>
        ))}
      {results.length === 0 &&
        chatPreviews.map((c: any, i: any) => (
          <div key={i}>
            <ChatPreview
              roomId={c.roomId}
              receiverId={c.receiverId}
              lastMessage={c.lastMessage}
            />
          </div>
        ))}
    </SectionLayout>
  );
}
