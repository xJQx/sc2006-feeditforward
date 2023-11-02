import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormButton,
  FormContainer,
  FormInput,
  GoogleLoginButton,
  HorizontalDivider,
  Logo
} from "../../components";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { UserDisplay } from "../../utils/schema";
import { usersData } from "../../data/usersData";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailLogin = () => {
    // Input fields validation
    if (!password || !email) {
      return toast.error("Please enter your email and password!");
    }
    if (password && password.length < 8) {
      return toast.error("Password must be at least 8 characters long!");
    }

    // TODO: link to backend

    console.log(email);
    console.log(password);
    const user: UserDisplay = usersData[0]; // TO CHANGE
    const success = true; // TO CHANGE
    if (success) {
      // Add user to context
      authContext.setIsLoggedIn(true);
      authContext.setUser(user);

      toast.success("Log in successfully");
      navigate("/");
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="w-full flex justify-center items-center gap-3 my-12">
        <Logo />

        <div className="font-voltaire text-[36px] text-brand-primary-active">
          FeedItForward
        </div>
      </div>

      <div className="px-4">
        <div className="text-brand-dark text-[32px] font-bold">Welcome!</div>
        {/* Login with Email */}
        <FormContainer onFormSubmit={handleEmailLogin}>
          <div className="flex flex-col gap-4 mt-4">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              setValue={setEmail}
            />
            <div className="flex flex-col">
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                setValue={setPassword}
              />
              <span
                className="text-brand-primary-active text-[12px] self-end pt-1"
                onClick={() => {
                  toast("Please contact the Customer Service Support...", {
                    icon: "💡"
                  });
                }}
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <FormButton label="Login" className="mt-4" />

            <div className="flex justify-center">
              Don't have an account?&nbsp;
              <span
                className="text-brand-primary-active underline"
                onClick={() => navigate("/auth/signup")}
              >
                Sign Up
              </span>
            </div>
          </div>
        </FormContainer>

        <HorizontalDivider label="Or" className="my-6" />

        {/* Login with Google */}
        <div className="pt-2 mb-8">
          <GoogleLoginButton />
        </div>
      </div>
    </>
  );
};
