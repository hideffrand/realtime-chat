import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import SidebarProvider from "./SidebarProvider";
import SearchProvider from "./SearchProvider";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
