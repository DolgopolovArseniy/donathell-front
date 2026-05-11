import { ComponentPropsWithoutRef, ReactNode } from "react";

interface AuthFormFieldProps extends ComponentPropsWithoutRef<"label"> {
  label: string;
  children: ReactNode;
}

export default function AuthFormField({
  label,
  children,
  ...props
}: AuthFormFieldProps) {
  return (
    <div className="flex flex-col self-start w-full gap-0.5">
      <label {...props}>{label}</label>
      {children}
    </div>
  );
}
