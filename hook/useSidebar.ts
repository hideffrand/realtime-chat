import { SidebarContext } from "@/context/SidebarProvider";
import { useContext } from "react";

export const useSidebar = () => {
  const sidebarCtx = useContext(SidebarContext);
  if (!sidebarCtx) {
    throw new Error("useSidebar must be within sidebar provider");
  }

  return sidebarCtx;
};
