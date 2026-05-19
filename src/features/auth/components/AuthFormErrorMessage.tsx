interface AuthErrorMessageProps {
  message: string;
}

export default function AuthErrorMessage({ message }: AuthErrorMessageProps) {
  return <p className="text-[#FF1A1A]">{message}</p>;
}
