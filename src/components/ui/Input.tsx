import { ComponentPropsWithoutRef } from "react";
import "../../glass.css";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  showPassword?: boolean;
}

export default function Input({
  className = "",
  type = "text",
  showPassword,
  ...props
}: InputProps) {
  const inputType = showPassword ? "password" : type;
  return (
    <input
      autoComplete="off"
      className={`bg-[#131416] rounded-xl outline-none placeholder-[#c7ccc8a8] 
                  h-11
                  duration-100 text-donathell-secondary glass-input
                  ${showPassword ? "font-mono" : ""} 
                  ${className}`}
      type={inputType}
      {...props}
    />
  );
}
