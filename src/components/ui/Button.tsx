import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-2xl text-md px-6 py-2 cursor-pointer duration-200 bg-donathell-main text-[#101115] hover:bg-[#32970d] font-bold glass-button ${className}`}
    >
      {children}
    </button>
  );
}
