import React from "react";
import { FaWifi, FaSignal, FaBatteryFull } from "react-icons/fa";

export const PhoneNotificationBar = () => {
  return (
    <div className="px-6 pt-[10px] flex justify-between text-[12px] font-bold">
      <div>9:41</div>
      <div className="flex gap-[6px] items-center">
        <FaSignal className="w-[14px] h-[14px]" />
        <FaWifi className="w-[14px] h-[14px]" />
        <FaBatteryFull className="w-[14px] h-[14px]" />
      </div>
    </div>
  );
};
