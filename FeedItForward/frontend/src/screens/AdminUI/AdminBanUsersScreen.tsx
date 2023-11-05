import React from "react";
import { ScreenTitle } from "../../components";
import { SearchBar } from "../../components";
import { UserDisplay } from "../../utils/schema";
import { useNavigate } from "react-router-dom";
import { usersData } from "../../data/usersData";

export const AdminBanUsersScreen = () => {
  // TODO: fetch data from backend

  const handleSearchUsersToBan = (searchKey: string) => {
    // TODO: Search for users to ban
    console.log(`Search for users to ban with searchKey ${searchKey}`);
  };

  return (
    <div>
      <ScreenTitle title="Ban Users" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <SearchBar
          searchItemPlaceholder="user to ban"
          handleSearch={handleSearchUsersToBan}
        />
        <UserListItems usersData={usersData} />
      </div>
    </div>
  );
};

// ---------- Helper Components ---------- //
interface UserListItemsProps {
  usersData: UserDisplay[];
}

const UserListItems = (props: UserListItemsProps) => {
  const { usersData } = props;

  return (
    <div className="border-2 border-brand-darkgray rounded-lg max-h-[25rem] min-h-[22rem] overflow-y-auto">
      <ul className="list-none">
        {usersData.map(user => (
          <UserListItem key={user.user_id} {...user} />
        ))}
      </ul>
    </div>
  );
};

const UserListItem = (props: UserDisplay) => {
  const { user_id, name, role, profile_picture } = props;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/admin/ban-user/${user_id}`);
  };

  return (
    <li
      className="flex flex-row gap-5 px-5 py-3 items-center justify-start border-b-2 border-brand-darkgray active:bg-brand-darkgray"
      onClick={handleOnClick}
    >
      {/* Photo */}
      <div className="bg-gray-300 w-14 h-14 rounded-full flex justify-center items-center">
        <img
          src={
            profile_picture
              ? profile_picture
              : "https://picsum.photos/id/237/200/300"
          }
          alt={profile_picture ? `${name}'s profile pic` : "profile pic"}
          className="w-12 aspect-square rounded-full object-cover object-center"
        />
      </div>

      {/* Name and Role */}
      <div>
        <div className="text-[22px] font-bold">{name}</div>
        <span className="text-gray-500 text-[16px]">{role}</span>
      </div>
    </li>
  );
};
