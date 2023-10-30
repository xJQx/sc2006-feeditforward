import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="w-full bg-black text-white">PhoneNotificationBar</nav>
      <main className="flex-1 max-h-[calc(100vh-112px)] overflow-y-scroll p-2">
        <Outlet />
      </main>
      <footer className="fixed w-full bottom-0">
        <Navbar />
      </footer>
    </div>
  );
};
