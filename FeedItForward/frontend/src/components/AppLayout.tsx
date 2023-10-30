import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { PhoneNotificationBar } from "./PhoneNotificationBar";

export const AppLayout = () => {
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
