import { ReactNode } from "react";

export default function Icon({ children }: { children: ReactNode }) {
  return <div className="md:text-xl text-lg rounded-[6px]">{children}</div>;
}
