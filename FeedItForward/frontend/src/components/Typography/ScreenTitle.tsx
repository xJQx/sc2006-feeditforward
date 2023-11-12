import React from "react";
import { ButtonBackNavigation } from "../ButtonBackNavigation";

interface ScreenTitleProps {
  title: string;
  backNav?: boolean;
}

export const ScreenTitle = ({ title, backNav = true }: ScreenTitleProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 ${
        backNav ? "pt-3" : "pt-12"
      }`}
    >
      {backNav && (
        <div className="self-start">
          <ButtonBackNavigation />
        </div>
      )}
      <div className="text-[28px] font-nunito font-bold text-center">
        {title}
      </div>
    </div>
  );
};
