import { Eye, EyeOff } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import Input from "../../../shared/components/Input";

interface AuthFormInputProps extends ComponentPropsWithoutRef<"input"> {
  isPassword?: boolean;
}

export default function AuthFormInput({
  isPassword,
  ...props
}: AuthFormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input className="w-full p-2" showPassword={showPassword} {...props} />
      {isPassword && (
        <button
          type="button"
          className="cursor-pointer hover:bg-[#555658] rounded-full duration-100 absolute right-1 top-1/2 -translate-y-1/2 p-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      )}
    </div>
  );
}
