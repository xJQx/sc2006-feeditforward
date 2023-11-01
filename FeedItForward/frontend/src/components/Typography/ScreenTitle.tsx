import React from "react";
import { ButtonBackNavigation } from "../ButtonBackNavigation";

interface ScreenTitleProps {
  title: string;
}

export const ScreenTitle = ({ title }: ScreenTitleProps) => {
  return (
    <div className="flex flex-col items-center justify-center pt-3 gap-1">
      <div className="self-start">
        <ButtonBackNavigation />
      </div>
      <div className="text-[28px] font-nunito font-bold">{title}</div>
    </div>
  );
};
