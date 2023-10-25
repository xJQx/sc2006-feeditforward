import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer = ({ children }: FormContainerProps) => {
  return <div>{children}</div>;
};
