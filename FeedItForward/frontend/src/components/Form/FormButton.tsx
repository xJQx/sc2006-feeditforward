import React from "react";

interface FormButtonProps {
  label: string;
  className?: string;
}

export const FormButton = (props: FormButtonProps) => {
  const { label, className } = props;

  return (
    <button
      type="submit"
      className={
        "w-full bg-brand-primary rounded-md text-white font-bold text-[18px] py-3 " +
        className
      }
    >
      {label}
    </button>
  );
};
