import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PhoneNotificationBar } from "./PhoneNotificationBar";
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

  return (
    <div className="h-screen flex flex-col">
      <nav className="w-full">
        <PhoneNotificationBar />
      </nav>
      <main className="flex-1 max-h-[calc(100vh-116px)] overflow-y-scroll py-2 px-5">
        <Outlet />
      </main>
      <footer className="fixed w-full bottom-0">
        <Navbar />
      </footer>
    </div>
  );
};
