import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ButtonBackNavigation = () => {
  const navigate = useNavigate();

  return (
    <MdOutlineKeyboardArrowLeft
      className="w-[38px] h-[38px] p-1 rounded-xl bg-brand-tertiary cursor-pointer"
      onClick={() => navigate(-1)}
    />
  );
};
