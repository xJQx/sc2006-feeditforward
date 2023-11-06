import React from "react";
import { ROLES } from "../../schemas/user";

interface FormSelectProps {
  label: string;
  placeholder: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

export const FormSelect = (props: FormSelectProps) => {
  const { label, placeholder, value, setValue } = props;

  return (
    <div>
      <div className="font-bold text-brand-dark text-[18px]">{label}</div>
      <select
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full border border-brand-darkgray text-[16px] px-3 py-2 rounded-md"
      >
        {ROLES.map(role => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};
