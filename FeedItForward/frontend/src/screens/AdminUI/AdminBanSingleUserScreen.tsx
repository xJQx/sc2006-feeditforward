import React, { useEffect, useState } from "react";
import {
  AdminUserDisplayCard,
  Button,
  ScreenSubTitle,
  ScreenTitle
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { UserDisplay } from "../../schemas/user";
import { userToVerifyData } from "../../data/adminData";

export const AdminBanSingleUserScreen = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<UserDisplay>();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch data from Backend
    const user: UserDisplay = userToVerifyData.filter(
      user => user.user_id === userId
    )[0];
    setUser(user);
  }, [userId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleBan = () => {
    // TODO
    console.log("handleBan");
  };

  return (
    <div className="mb-12">
      <ScreenTitle title="Ban User" />

      {/* User Card */}
      {user && (
        <div className="mt-8">
          <AdminUserDisplayCard user={user} />
        </div>
      )}

      {/* Offenses */}
      <ScreenSubTitle title="Offenses" />
      <div className="mt-1 p-2 w-full border h-[150px]">Placeholder (TODO)</div>

      {/* Order History */}
      <ScreenSubTitle title="Order History" />
      <div className="mt-1 p-2 w-full border h-[150px]">Placeholder (TODO)</div>

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center mt-6">
        <Button
          label="Cancel"
          className="!bg-brand-gray"
          onClick={handleCancel}
        />
        <Button label="Ban" className="!bg-[#F26C6C]" onClick={handleBan} />
      </div>
    </div>
  );
};
