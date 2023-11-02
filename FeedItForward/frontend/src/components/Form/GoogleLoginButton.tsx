import React from "react";
import toast from "react-hot-toast";

export const GoogleLoginButton = () => {
  const handleOnClick = () => {
    // TODO: Link to Google OAuth
    console.log("Log in with Google");
    toast("TODO: Login with Google");
  };

  return (
    <div
      className="w-full flex bg-blue-500 text-white items-center rounded-md"
      onClick={handleOnClick}
    >
      <div className="bg-white rounded m-[2px] p-[6px] w-max">
        <img
          src="/images/google-logo.webp"
          alt="google logo"
          className="w-10 h-10"
        />
      </div>
      <div className="flex justify-center mx-auto font-bold text-[18px] py-2">
        Sign in with Google
      </div>
    </div>
  );
};
