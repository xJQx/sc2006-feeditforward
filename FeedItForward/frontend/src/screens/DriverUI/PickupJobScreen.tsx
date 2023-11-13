import React, { useState } from "react";
import { JobConfirmationModal } from "../../components";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";
import { Button } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ScreenTitle } from "../../components";

export const PickupJobScreen = () => {
  const [text, setText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Photos
  const [foodPickupImages, setFoodPickupImages] = useState<string[]>([]);
  const [hawkerPickupImages, setHawkerPickupImages] = useState<string[]>([]);
  const [foodDropoffImages, setFoodDropoffImages] = useState<string[]>([]);
  const [consumerDropoffImages, setConsumerDropoffImages] = useState<string[]>(
    []
  );

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmClick = () => {
    alert(`Step ${currentStep} confirmed`);
  };

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <ScreenTitle title="Step 1 of 2: Submit proof of pick up" />
            <div style={{ padding: "20px" }}>
              <FormImagePicker
                label="Attach a picture of the food at pick up location"
                labelClassNames="text-[14px]"
                filePaths={foodPickupImages}
                setFilePaths={setFoodPickupImages}
              />

              <FormImagePicker
                label="Attach a picture of the hawker at pick up location"
                labelClassNames="text-[14px]"
                filePaths={hawkerPickupImages}
                setFilePaths={setHawkerPickupImages}
              />
              <Button
                className="!text-white !bg-[#1BCCCC] !min-w-[100%]"
                onClick={handleConfirmClick}
              >
                Confirm
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <ScreenTitle title="Step 2 of 2: Submit proof of delivery" />
            <div className="p-[20px]">
              <FormImagePicker
                label="Attach a picture of the food at drop off location"
                labelClassNames="text-[14px]"
                filePaths={foodDropoffImages}
                setFilePaths={setFoodDropoffImages}
              />
              <FormImagePicker
                label="Attach a picture of the consumer at drop off location"
                labelClassNames="text-[13px]"
                filePaths={consumerDropoffImages}
                setFilePaths={setConsumerDropoffImages}
              />
              <Button
                className="!text-white !bg-[#1BCCCC] !min-w-[100%]"
                onClick={handleConfirmClick}
              >
                Confirm
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {StepContent()}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <IoChevronBack
          size={28}
          style={{ color: "#CCC", cursor: "pointer" }}
          onClick={handlePreviousStep}
        />
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          {currentStep} of {totalSteps}
        </span>
        <IoChevronForward
          size={28}
          style={{ color: "#CCC", cursor: "pointer" }}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};
