"use client";

import { ReactNode, createContext, useState } from "react";

interface ISidebarContext {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<ISidebarContext | null>(null);

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function toggleSidebar() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
