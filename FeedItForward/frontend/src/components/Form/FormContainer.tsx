import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const FormContainer = (props: FormContainerProps) => {
  const { onFormSubmit, children } = props;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onFormSubmit(e);
      }}
    >
      {children}
    </form>
  );
};
