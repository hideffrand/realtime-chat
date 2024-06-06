"use client";

import Icon from "./Icons";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/hook/useSidebar";

interface IButton {
  icon: ReactNode;
  text?: string | boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export default function Button({ icon, text, onClick, isActive }: IButton) {
  const router = useRouter();
  const { isExpanded } = useSidebar();

  function handleClick() {
    if (onClick) {
      onClick();
    }
    if (text) {
      router.push(`/?section=${text}`);
    }
  }

  return (
    <button
      className={`relative ${
        text ? "w-full" : "w-fit"
      } p-2 inline-flex items-center gap-4 ${
        isActive ? "bg-gray-light" : ""
      } hover:bg-gray-light rounded-[4px] text-sm`}
      onClick={handleClick}
    >
      <Icon>{icon}</Icon>
      {isExpanded && text}
      {isActive && (
        <span className="absolute w-[3px] h-4 bg-green-secondary left-0 rounded-[10px]"></span>
      )}
    </button>
  );
}
