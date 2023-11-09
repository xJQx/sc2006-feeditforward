import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ScreenTitle } from "../../components";
import { Button } from "@mui/material";

export const ReviewAddScreen = () => {
  const [text, setText] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const submitButtonStyles = {
    color: "white",
    backgroundColor: "#1BCCCC",
    minWidth: "100%"
  };

  const handleSubmitClick = () => {
    alert("Submit button clicked");
  };

  return (
    <div>
      <ScreenTitle title="Add review" />
      <div style={{ padding: "20px" }}>
        <FormImagePicker
          filePaths={reviewImages}
          label="Photo"
          setFilePaths={setReviewImages}
        />
        <FormTextArea value={text} onChange={handleTextChange} />
        <Button
          className="!text-white !bg-[#1BCCCC] !min-w-[100%]"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
