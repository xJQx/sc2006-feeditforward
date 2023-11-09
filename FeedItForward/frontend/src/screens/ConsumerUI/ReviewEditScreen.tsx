import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ScreenTitle } from "../../components";
import { Button } from "@mui/material";

export const ReviewEditScreen = () => {
  const [text, setText] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleCancelClick = () => {
    alert("Cancel button clicked");
  };

  const handleSaveClick = () => {
    alert("Save button clicked");
  };

  return (
    <div>
      <ScreenTitle title="Edit review" />
      <div style={{ padding: "20px" }}>
        <FormImagePicker
          label="Photo"
          isEdit
          filePaths={reviewImages}
          setFilePaths={setReviewImages}
        />

        <FormTextArea value={text} onChange={handleTextChange} isEdit />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="!text-[#1BCCCC] !min-w-[45%] !border-[#1BCCCC]"
            onClick={handleCancelClick}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            className="!text-white !bg-[#1BCCCC] !min-w-[45%]"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
