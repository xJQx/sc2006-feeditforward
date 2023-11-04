import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalCloseButtonProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCloseButton = (props: ModalCloseButtonProps) => {
  const { setIsModalOpen } = props;

  return (
    <div
      className="absolute right-0 top-0 pt-3 pr-3 text-brand-primary-active"
      onClick={() => setIsModalOpen(false)}
    >
      <AiOutlineClose />
    </div>
  );
};
