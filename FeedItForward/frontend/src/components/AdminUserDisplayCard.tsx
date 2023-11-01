import React from "react";
import { UserDisplay } from "../utils/schema";

interface AdminUserDisplayCardProps {
  user: UserDisplay;
}

export const AdminUserDisplayCard = (props: AdminUserDisplayCardProps) => {
  const { user } = props;

  return (
    <div className="flex flex-row gap-3 px-3 py-2 items-center justify-start border shadow-md rounded-lg">
      {/* Photo */}
      <div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
        <img
          src={
            user?.img?.src
              ? user?.img.src
              : "https://picsum.photos/id/237/200/300"
          }
          alt={user?.img?.alt ? user?.img.alt : "profile pic"}
          className="w-10 aspect-square rounded-full object-cover object-center"
        />
      </div>

      {/* Name and Role */}
      <div className="flex flex-col">
        <span className="text-[18px] font-bold">{user?.name}</span>
        <span className="text-gray-500 text-[14px]">{user?.role}</span>
      </div>
    </div>
  );
};
