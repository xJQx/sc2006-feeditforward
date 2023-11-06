import React, { useEffect, useState } from "react";
import {
  AdminUserDisplayCard,
  Button,
  ScreenSubTitle,
  ScreenTitle
} from "../../components";
import { useParams } from "react-router-dom";
import { userToVerifyData } from "../../data/adminData";
import { UserDisplay } from "../../schemas/user";

export const AdminVerifySingleUserScreen = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<UserDisplay>();

  useEffect(() => {
    // TODO: Fetch data from Backend
    const user: UserDisplay = userToVerifyData.filter(
      user => user.user_id === userId
    )[0];
    setUser(user);
  }, [userId]);

  const handleApprove = () => {
    // TODO
    console.log("handleApprove");
  };
  const handleReject = () => {
    // TODO
    console.log("handleReject");
  };
  const handleRequest = () => {
    // TODO
    console.log("handleRequest");
  };

  return (
    <div className="mb-12">
      <ScreenTitle title="Verify User" />

      {/* User Card */}
      {user && (
        <div className="mt-8">
          <AdminUserDisplayCard user={user} />
        </div>
      )}

      {/* Income Statement */}
      <ScreenSubTitle title="Income Statement" />
      <div className="mt-1 p-2 w-full border h-[150px]">Placeholder (TODO)</div>

      {/* Address */}
      <ScreenSubTitle title="Address" />
      <div className="mt-1">
        {/* Street */}
        <div className="flex text-[14px]">
          <span className="font-nunito font-semibold">Street:&nbsp;</span>
          <input
            className="border rounded-md bg-white pl-2 w-full"
            placeholder="Boon Lay Street 1"
            disabled
          />
        </div>
        <div className="flex justify-between mt-2">
          {/* Unit */}
          <div className="text-[14px]">
            <span className="font-nunito font-semibold">Unit:&nbsp;</span>
            <input
              className="border rounded-md bg-white pl-2 w-[60px]"
              placeholder="#17-21"
              disabled
            />
          </div>
          {/* Block */}
          <div className="text-[14px]">
            <span className="font-nunito font-semibold">Block:&nbsp;</span>
            <input
              className="border rounded-md bg-white pl-2 w-[35px]"
              placeholder="31"
              disabled
            />
          </div>
          {/* Postal Code */}
          <div className="text-[14px]">
            <span className="font-nunito font-semibold">
              Postal Code:&nbsp;
            </span>
            <input
              className="border rounded-md bg-white pl-2 w-[65px]"
              placeholder="513662"
              disabled
            />
          </div>
        </div>
      </div>

      {/* CPF Statement */}
      <ScreenSubTitle title="CPF Statement" />
      <div className="mt-1 p-2 w-full border h-[150px]">Placeholder (TODO)</div>

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center mt-6">
        <Button label="Approve" onClick={handleApprove} />
        <Button
          label="Reject"
          className="!bg-[#F26C6C]"
          onClick={handleReject}
        />
        <Button
          label="Request"
          className="!bg-brand-gray"
          onClick={handleRequest}
        />
      </div>
    </div>
  );
};
