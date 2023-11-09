import React, { useState } from "react";
import { Button, HorizontalDivider, ScreenTitle } from "../../components";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export const ProfileScreen = () => {
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState(user?.address ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [contactNumber, setContactNumber] = useState(
    user?.contact_number ?? ""
  );

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSafeProfile = () => {
    if (!address || !email || !contactNumber) {
      return toast.error("Please input all fields!");
    }

    // TODO: Save profile changes to Backend

    setEditMode(false);
  };

  return (
    <div>
      <ScreenTitle title="Profile" />
      {user ? (
        <div className="flex flex-col px-4 mt-8">
          {/* Uneditable Profile Info */}
          <div className="flex gap-4">
            <img
              src={user.profile_picture}
              alt={`${user.name}'s profile pic`}
              className="w-28 h-36 object-cover"
            />
            <div className="flex flex-col justify-center">
              <div className="font-bold text-[24px]">{user.name}</div>
              <div className="text-[14px]">{user.role}</div>
              <Button
                label={editMode ? "Save Profile" : "Edit Profile"}
                className={`text-white !font-roboto !font-normal !rounded-none !px-8 mt-3 ${
                  editMode && "bg-brand-primary-active"
                }`}
                onClick={editMode ? handleSafeProfile : handleEditProfile}
              />
            </div>
          </div>

          {/* Editable Profile Info - Address, Email, Contact Number */}
          <HorizontalDivider />
          <ProfileRowComponent
            title="Address"
            value={address}
            setValue={setAddress}
            editMode={editMode}
            type="text"
          />
          <HorizontalDivider />
          <ProfileRowComponent
            title="Email"
            value={email}
            editMode={editMode}
            setValue={setEmail}
            type="text"
          />
          <HorizontalDivider />
          <ProfileRowComponent
            title="Contact Number"
            value={contactNumber}
            setValue={setContactNumber}
            editMode={editMode}
            type="text"
          />
        </div>
      ) : (
        <div>No User</div>
      )}
    </div>
  );
};

interface ProfileRowComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  editMode: boolean;
  type: React.HTMLInputTypeAttribute;
}

const ProfileRowComponent = (props: ProfileRowComponentProps) => {
  const { title, value, setValue, editMode, type } = props;

  return (
    <div className="flex flex-col my-2">
      <div className="font-bold text-[22px]">{title}</div>
      {editMode ? (
        <input
          id={title}
          type={type}
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full border border-brand-darkgray text-[16px] px-3 py-2 rounded-md"
        />
      ) : (
        <div className="">{value}</div>
      )}
    </div>
  );
};
