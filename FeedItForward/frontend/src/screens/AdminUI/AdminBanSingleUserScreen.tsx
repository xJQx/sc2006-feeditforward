import React, { useEffect, useState } from "react";
import {
  AdminUserDisplayCard,
  Button,
  FormSelect,
  ScreenSubTitle,
  ScreenTitle
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { UserDisplay } from "../../schemas/user";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";

export const AdminBanSingleUserScreen = () => {
  let { userId } = useParams();
  const [user, setUser] = useState<UserDisplay>();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("Forever");

  useEffect(() => {
    const getUserData = async () => {
      const user = await fetch.get(`/user-controller/get-user-by-id/${userId}`);
      setUser(user);
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleBan = async () => {
    if (!banReason) return toast.error("Please enter ban reason");
    else if (!banDuration) return toast.error("Please enter ban duration");

    const bannedUser: UserDisplay = await fetch.get(
      `/admin-controller/ban-user/${userId}`
    );
    if (bannedUser.ban) {
      toast.success(`User ${user?.name} banned.`);
      navigate(-1);
    } else {
      toast.error("Failed to ban user.");
    }
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
      <ScreenSubTitle title="Reason" />
      <textarea
        className="mt-1 p-2 w-full border h-[150px]"
        placeholder="Explain why you are banning this user..."
        value={banReason}
        onChange={e => setBanReason(e.target.value)}
      />

      {/* Ban Duration */}
      <ScreenSubTitle title="Ban Duration" />
      <FormSelect
        label=""
        placeholder="Forever"
        value={banDuration}
        setValue={setBanDuration}
        optionsList={["Forever"]}
      />

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center mt-12">
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
