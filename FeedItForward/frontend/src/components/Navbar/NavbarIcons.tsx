import React from "react";
import { GoHome } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline, IoLocationOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export const NavbarIcons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex justify-between px-8 py-6">
      <div className="flex gap-8">
        <GoHome
          className={`cursor-pointer w-10 h-10 ${
            path === "/" ? "text-brand-primary" : "text-brand-darkgray"
          }`}
          onClick={() => navigate("/")}
        />
        <IoLocationOutline
          className={`cursor-pointer w-10 h-10 ${
            path === "/map" ? "text-brand-primary" : "text-brand-darkgray"
          }`}
          onClick={() => navigate("/map")}
        />
      </div>
      <div className="flex gap-8">
        <AiOutlineMessage
          className={`cursor-pointer w-10 h-10 ${
            path === "/customer-service-support"
              ? "text-brand-primary"
              : "text-brand-darkgray"
          }`}
          onClick={() => navigate("/customer-service-support")}
        />
        <IoSettingsOutline
          className={`cursor-pointer w-10 h-10 ${
            path === "/settings" ? "text-brand-primary" : "text-brand-darkgray"
          }`}
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
};
