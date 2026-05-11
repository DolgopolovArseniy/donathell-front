import { Link } from "react-router";
import "../../glass.css";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface AuthFormProps extends ComponentPropsWithoutRef<"form"> {
  isLoading: boolean;
  type: "login" | "signup";
  children: ReactNode;
}

export default function AuthForm({
  isLoading,
  type,
  children,
  ...props
}: AuthFormProps) {
  const isSignup = type === "signup";
  return (
    <form
      {...props}
      className="glass mb-10 flex w-full max-w-full flex-col items-stretch gap-3.5 rounded-3xl bg-[#121315] px-4 py-4 shadow-lg/30 sm:mb-16 sm:px-6 md:mb-20"
    >
      <h2 className="self-center text-center text-xl font-medium sm:text-2xl">
        {isSignup ? "Sign up" : "Log in"} to{" "}
        <span className="text-donathell-main font-bold">Donathell</span>
      </h2>
      {children}
      <button
        type="submit"
        className={`mt-3 rounded-2xl text-lg ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} duration-200  bg-donathell-main text-[#101115] font-semibold h-11 hover:bg-[#32970d] disabled:bg-[#363739] glass-button`}
        disabled={isLoading}
      >
        {isSignup ? "Sign up" : "Log in"}
      </button>
      <Link
        to={`/${isSignup ? "login" : "signup"}`}
        className="flex h-11 items-center justify-center rounded-2xl px-2 text-center text-sm text-donathell-main duration-200 hover:bg-[#555658] hover:text-donathell-secondary sm:text-base"
      >
        {isSignup
          ? "Have an account? Log in"
          : "Don't have an account? Sign up"}
      </Link>
    </form>
  );
}
