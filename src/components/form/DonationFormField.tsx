import { ChangeEvent } from "react";
import Input from "../ui/Input";

interface DonationFormFieldProps {
  label: string;
  inputPlaceholder: string;
  value: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function DonationFormField({
  label,
  inputPlaceholder,
  value,
  onChange,
  type,
}: DonationFormFieldProps) {
  return (
    <div className="flex flex-col gap-1 text-[#c1c2c1]">
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
      <Input
        className="w-full max-w-full sm:max-w-60"
        type={type}
        id={label}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default DonationFormField;
