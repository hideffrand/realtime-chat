"use client";

import { IoIosMenu } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiFocus2Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoArchiveOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "@/hook/useAuth";
import ProfilePicture from "../atoms/ProfilePicture";
import Button from "../atoms/Button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSidebar } from "@/hook/useSidebar";

export default function Sidebar() {
  const { user, login } = useAuth();
  const { isExpanded, toggleSidebar } = useSidebar();

  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return (
    <div
      className={`${
        isExpanded ? "w-80" : "w-fit"
      } h-screen px-2 py-5 flex flex-col justify-between bg-gray-dark transition-all`}
      style={{
        transition: "all 1s ease-in-out",
      }}
    >
      <div className="w-full flex flex-col gap-1">
        <div className="pb-2">
          <Button icon={<IoIosMenu />} onClick={toggleSidebar} />
        </div>
        <Button
          icon={<IoChatbubbleEllipsesOutline />}
          text={"Chats"}
          isActive={section === "Chats" && true}
        />
        <Button
          icon={<IoCallOutline />}
          text={"Calls"}
          isActive={section === "Calls" && true}
        />
        <Button
          icon={<RiFocus2Line />}
          text={"Status"}
          isActive={section === "Status" && true}
        />
        {/* <button onClick={login}>login</button> */}
      </div>
      <div className="w-full flex flex-col gap-1">
        <Button
          icon={<FaRegStar />}
          text={"Starred messages"}
          isActive={section === "Starred messages" && true}
        />
        <Button
          icon={<IoArchiveOutline />}
          text={"Archieved chats"}
          isActive={section === "Archieved chats" && true}
        />
        <span className="w-full my-2 h-[1px] bg-gray-light"></span>
        <Button icon={<IoSettingsOutline />} text={"Settings"} />
        {!user ? (
          <Button
            icon={<ProfilePicture src="/blank_profile.webp" />}
            onClick={login}
          />
        ) : (
          <Button icon={<ProfilePicture src={user?.photoUrl} />} />
        )}
      </div>
    </div>
  );
}
