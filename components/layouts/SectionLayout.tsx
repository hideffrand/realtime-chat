import { ReactNode } from "react";

export default function SectionLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-[24%] h-full p-4 border-r border-gray-dark bg-gray-normal rounded-l-xl">
      {children}
    </section>
  );
}
