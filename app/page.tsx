"use client"

import Sidebar from "@/components/organisms/Sidebar";
import ChatRoom from "@/components/organisms/ChatRoom";
import ChatSection from "@/components/organisms/ChatSection";
import BlankSection from "@/components/organisms/BlankSection";
import { useAuth } from "@/hook/useAuth";

export default function Main({
  searchParams,
}: {
  searchParams: { room: string };
}) {
  const { user } = useAuth();

  return (
    <main className="w-full h-screen flex">
      <Sidebar />
      <ChatSection />
      {searchParams.room || user ? <ChatRoom /> : <BlankSection />}
    </main>
  );
}
