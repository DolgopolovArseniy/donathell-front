import type { ReactNode } from "react";

const labelClass = "text-sm text-[#c1c2c1]";

export interface FilterFieldProps {
  label: string;
  children: ReactNode;
}

export default function FilterField({ label, children }: FilterFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className={labelClass}>{label}</span>
      {children}
    </div>
  );
}
