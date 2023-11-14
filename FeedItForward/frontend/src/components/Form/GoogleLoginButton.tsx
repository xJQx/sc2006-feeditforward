import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
  const { setIsLoggedIn, setUser, setGoogleAuthDetails } = useAuthContext();
  const customFetch = useFetch();
  const navigate = useNavigate();

  const onSuccess = async (response: any) => {
    try {
      // Get Google User Info
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json"
          }
        }
      );
      const googleUser = await res.json();

      const email = googleUser.email;
      const name = googleUser.name;

      // Login into FeedItForward using google gmail
      const emailRegistered = await customFetch.get(
        `/auth/login-google?email=${email}`
      );
      if (emailRegistered) {
        const user = await customFetch.get(`/user/email/${email}`);
        setUser(user);
        setIsLoggedIn(true);

        toast.success("Login successfully.");
        navigate("/");
      } else {
        setGoogleAuthDetails({
          authenticated: true,
          email: email,
          name: name
        });

        toast.success("Please register your details with us.");
        navigate("/auth/signup");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onError = (error: any) => {
    console.log("Google login failed:", error);
  };

  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError
  });

  return (
    <div
      className="w-full flex bg-blue-500 text-white items-center rounded-md"
      onClick={() => login()}
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
