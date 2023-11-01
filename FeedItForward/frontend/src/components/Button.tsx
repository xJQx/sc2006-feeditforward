import React from "react";

interface ButtonProps {
  name: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { name, onClick, className } = props;

  return (
    <div
      className={
        "bg-brand-primary min-w-[85px] w-max px-3 py-1 rounded-lg font-nunito font-bold flex justify-center items-center " +
        className
      }
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
