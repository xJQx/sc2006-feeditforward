import React from "react";

interface FormInputProps {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  disabled?: boolean;
}

export const FormInput = (props: FormInputProps) => {
  const { label, placeholder, type, value, setValue, disabled = false } = props;

  return (
    <div>
      <div className="font-bold text-brand-dark text-[18px]">{label}</div>
      <input
        id={`${type}-${label}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full border border-brand-darkgray text-[16px] px-3 py-2 rounded-md"
        disabled={disabled}
      />
    </div>
  );
};
