import React from "react";
import { NavbarIcons } from "./NavbarIcons";
import { NarbarRoleSpecificIcon } from "./NarbarRoleSpecificIcon";

export const Navbar = () => {
  return (
    <div className="relative bg-white shadow-[0_-1px_35px_1px_#CCCCCC]">
      {/* Bag Icon - Role Specific Icon */}
      <div className="absolute -top-6 left-[50%] -translate-x-[50%] flex">
        <NarbarRoleSpecificIcon />
      </div>

      {/* Other Icons */}
      <NavbarIcons />
    </div>
  );
};
