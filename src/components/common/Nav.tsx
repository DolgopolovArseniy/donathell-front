import { ReactNode } from "react";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="flex flex-col gap-4 w-full p-3 sm:p-4">{children}</nav>
  );
}
