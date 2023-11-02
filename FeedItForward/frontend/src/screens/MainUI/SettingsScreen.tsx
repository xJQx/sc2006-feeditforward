import React from "react";
import { Button, HorizontalDivider, ScreenTitle } from "../../components";
import { BsPersonGear, BsBell, BsGlobe2 } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export const SettingsScreen = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext.setUser(null);
    authContext.setIsLoggedIn(false);
    navigate("/auth/login");
    toast.success("Logout successfully.");
  };

  return (
    <div className="flex flex-col h-full">
      <ScreenTitle title="Settings" />

      {/* Settings Tabs */}
      <div className="flex flex-1 flex-col mx-6 my-8">
        {/* Profile */}
        <SettingsRowComponent
          icon={<BsPersonGear className="w-full h-full" />}
          title="Profile"
          href="/settings/profile"
        />
        <HorizontalDivider className="my-2" />

        {/* Notification */}
        <SettingsRowComponent
          icon={<BsBell className="w-full h-full" />}
          title="Notification"
          href="/settings/notification"
        />
        <HorizontalDivider className="my-2" />

        {/* Language */}
        <SettingsRowComponent
          icon={<BsGlobe2 className="w-full h-full" />}
          title="Language"
          href="/settings/language"
        />
        <HorizontalDivider className="my-2" />

        {/* Support */}
        <SettingsRowComponent
          icon={<MdOutlineSupportAgent className="w-full h-full" />}
          title="Support"
          href="/customer-service-support"
        />
      </div>

      {/* Logout Button */}
      <Button
        label="LOGOUT"
        className="!bg-brand-secondary !w-full py-3 mb-12 !font-roboto"
        onClick={handleLogout}
      />
    </div>
  );
};

interface SettingsRowComponentProps {
  icon: React.ReactElement<IconType>;
  title: string;
  href: string;
}

const SettingsRowComponent = (props: SettingsRowComponentProps) => {
  const { icon, title, href } = props;

  return (
    <div className="flex gap-3 items-center">
      <div className="w-10 h-10">{icon}</div>
      <Link to={href} className="text-[20px]">
        {title}
      </Link>
    </div>
  );
};
