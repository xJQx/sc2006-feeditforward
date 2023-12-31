import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PhoneNotificationBar } from "./Templates/PhoneNotificationBar";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export const AppLayout = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && !location.pathname.startsWith("/auth/")) {
      toast.error("Please login.");
      navigate("/auth/login");
    } else if (isLoggedIn && location.pathname.startsWith("/auth/")) {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  // Make the map cover the whole screeen
  if (location.pathname === "/map") {
    return (
      <div className="h-screen flex flex-col">
        <nav className="w-full absolute z-10">
          <PhoneNotificationBar />
        </nav>
        <main className="flex-1 max-h-[calc(100vh-88px)] overflow-y-scroll py-0 px-0">
          <Outlet />
        </main>
        <footer className="fixed w-full bottom-0">
          <Navbar />
        </footer>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="absolute top-0 z-50 w-full bg-transparent backdrop-blur-[2px]">
        <PhoneNotificationBar />
      </nav>
      <main className="relative flex-1 max-h-[calc(100vh-88px)] overflow-y-scroll py-2 px-5 pt-[36px]">
        <Outlet />
      </main>
      <footer className="fixed w-full bottom-0">
        <Navbar />
      </footer>
    </div>
  );
};
