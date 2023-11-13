import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { TbBackpack } from "react-icons/tb";
import { Link } from "react-router-dom";

export const NarbarRoleSpecificIcon = () => {
  const { user } = useAuthContext();

  let href = "";
  switch (user?.role) {
    case "Admin":
      href = "/admin";
      break;
    case "Consumer":
      href = "/leftover-food";
      break;
    case "Driver":
      href = "/pickup-jobs";
      break;
    case "Hawker":
      href = `/hawker/${user.user_id}/listings`;
      break;
    default:
      href = "/leftover-food";
      break;
  }

  return (
    <Link to={href} className="bg-white p-[10px] rounded-full">
      <TbBackpack className="w-16 h-16 text-white bg-black rounded-full p-[10px]" />
    </Link>
  );
};
