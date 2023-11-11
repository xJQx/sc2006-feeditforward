import React, { useEffect } from "react";
import { useState } from "react";
import { ScreenTitle } from "../../components";
import { SearchBar } from "../../components";
import { UserDisplay } from "../../schemas/user";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { PriorityRequest } from "../../schemas/priorityRequest";
import { simpleSearch } from "../../utils/search";
import { useGetServerImage } from "../../hooks";

interface UserToVerifySchmea extends UserDisplay {
  priority_request_id: number;
}

export const AdminVerifyUsersScreen = () => {
  const fetch = useFetch();

  const [usersToVerifyData, setUsersToVerifyData] = useState<
    UserToVerifySchmea[]
  >([]);
  const [filteredUsersToVerifyData, setFilteredUsersToVerifyData] = useState<
    UserToVerifySchmea[]
  >([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  // Get users to verify
  useEffect(() => {
    const getUsersToVerifyData = async () => {
      const priorityRequestsData: PriorityRequest[] = await fetch.get(
        "/priority-requests/status/Pending"
      );
      setUsersToVerifyData(
        priorityRequestsData.map(request => ({
          priority_request_id: request.priority_request_id,
          ...request.consumer.user
        }))
      );
    };
    getUsersToVerifyData();
  }, []);

  // Search Feature
  const handleSearchUsersToVerify = (searchQuery: string) => {
    const filteredUsers = simpleSearch(usersToVerifyData, searchQuery, [
      "name"
    ]);

    setFilteredUsersToVerifyData(filteredUsers);
    setIsSearch(true);
  };
  const handleOnSearchClear = () => {
    setFilteredUsersToVerifyData([]);
    setIsSearch(false);
  };

  return (
    <div>
      <ScreenTitle title="Verify User" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <SearchBar
          searchItemPlaceholder="user"
          handleSearch={handleSearchUsersToVerify}
          handleOnClear={handleOnSearchClear}
        />
        {isSearch ? (
          <VerifyUserListItems usersToVerifyData={filteredUsersToVerifyData} />
        ) : (
          <VerifyUserListItems usersToVerifyData={usersToVerifyData} />
        )}
      </div>
    </div>
  );
};

// ---------- Helper Components ---------- //
interface VerifyUserListItemsProps {
  usersToVerifyData: UserToVerifySchmea[];
}

const VerifyUserListItems = (props: VerifyUserListItemsProps) => {
  const { usersToVerifyData } = props;

  return (
    <div className="border-2 border-brand-darkgray rounded-lg max-h-[25rem] min-h-[22rem] overflow-y-auto">
      <ul className="list-none">
        {usersToVerifyData.map(data => (
          <VerifyUserListItem key={data.user_id} {...data} />
        ))}
      </ul>
    </div>
  );
};

const VerifyUserListItem = (props: UserToVerifySchmea) => {
  const { priority_request_id, name, role, profile_picture } = props;
  const navigate = useNavigate();
  const profilePictureImageUrl = useGetServerImage(profile_picture);

  const handleOnClick = () => {
    navigate(`/admin/verify-user/${priority_request_id}`);
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
              ? profilePictureImageUrl
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
