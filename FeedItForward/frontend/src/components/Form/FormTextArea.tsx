import React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { FaPencilAlt } from "react-icons/fa";

interface FormTextAreaProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
}

export const FormTextArea = (props: FormTextAreaProps) => {
  const { label, value, setValue, isEdit } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative mb-4">
      <p>{label}</p>
      <div className="relative">
        <TextareaAutosize
          className="border border-[#CCC] rounded-[8px] p-[15px] w-full !h-[175px]"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter your review..."
        />
        {isEdit && (
          <div
            style={{
              position: "absolute",
              bottom: "17px",
              right: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FaPencilAlt size={20} color="#000" />
          </div>
        )}
      </div>
    </div>
  );
};
