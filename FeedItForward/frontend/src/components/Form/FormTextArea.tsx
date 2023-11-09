import React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "../../styles/FormStyles.css";
import { FaPencilAlt } from "react-icons/fa";
interface FormTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  isEdit?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  value,
  onChange,
  isEdit
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    console.log(newValue); // Log user's input to console
  };

  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      <p>Review</p>
      <div style={{ position: "relative" }}>
        <TextareaAutosize
          className="textarea-custom"
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

export default FormTextArea;
