import React from "react";
import { AuthContextProvider } from "./AuthContext";

// Provider component
export const ContextProviders = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
