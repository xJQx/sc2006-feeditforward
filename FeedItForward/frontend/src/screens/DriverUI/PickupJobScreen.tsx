import React, { useEffect, useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import { Button } from "@mui/material";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { ScreenTitle } from "../../components";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { PICKUP_JOB_ACTION, PickupJob } from "../../schemas/pickupJob";
import { useNavigate, useParams } from "react-router-dom";

export const PickupJobScreen = () => {
  const { pickupJobId } = useParams();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [pickupJob, setPickupJob] = useState<PickupJob>();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Photos
  const [foodPickupImages, setFoodPickupImages] = useState<string[]>([]);
  const [hawkerPickupImages, setHawkerPickupImages] = useState<string[]>([]);
  const [foodDropoffImages, setFoodDropoffImages] = useState<string[]>([]);
  const [consumerDropoffImages, setConsumerDropoffImages] = useState<string[]>(
    []
  );

  // Fetch PickupJob
  useEffect(() => {
    const getPickupJobData = async () => {
      const data = await fetch.get(`/pickup-job/${pickupJobId}`);
      setPickupJob(data);
    };
    getPickupJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupJobId]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      // Validation
      if (foodPickupImages.length === 0) {
        return toast.error(
          "Please attach a picture of the food at pickup location."
        );
      }
      if (hawkerPickupImages.length === 0) {
        return toast.error(
          "Please attach a picture of the hawker at pickup location."
        );
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmClick = async () => {
    // Validation
    if (!pickupJob) return toast.error("Please login.");
    if (foodDropoffImages.length === 0) {
      return toast.error(
        "Please attach a picture of the food at drop off location."
      );
    }
    if (consumerDropoffImages.length === 0) {
      return toast.error(
        "Please attach a picture of the consumer at drop off location."
      );
    }

    try {
      const data: PickupJob = await fetch.post(
        "/driver-controller/process-pickup-job",
        {
          action: PICKUP_JOB_ACTION[2],
          pickup_job_id: pickupJobId,
          driver_id: pickupJob.driver_id,
          photo_proofs: [
            ...foodPickupImages,
            ...hawkerPickupImages,
            ...foodDropoffImages,
            ...consumerDropoffImages
          ]
        }
      );
      if (data.status === "Completed") {
        toast.success("Photo Proofs submitted successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to submit photo proofs");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* Step Inputs */}
      {currentStep === 1 && (
        <Step1Inputs
          foodPickupImages={foodPickupImages}
          setFoodPickupImages={setFoodPickupImages}
          hawkerPickupImages={hawkerPickupImages}
          setHawkerPickupImages={setHawkerPickupImages}
        />
      )}
      {currentStep === 2 && (
        <Step2Inputs
          foodDropoffImages={foodDropoffImages}
          setFoodDropoffImages={setFoodDropoffImages}
          consumerDropoffImages={consumerDropoffImages}
          setConsumerDropoffImages={setConsumerDropoffImages}
        />
      )}

      {/* Step navigation arrows */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "12px"
        }}
      >
        <IoChevronBack
          size={18}
          style={{ color: "#CCC", cursor: "pointer" }}
          onClick={handlePreviousStep}
        />
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#BBB" }}>
          {currentStep} of {totalSteps}
        </span>
        <IoChevronForward
          size={18}
          style={{ color: "#CCC", cursor: "pointer" }}
          onClick={handleNextStep}
        />
      </div>

      {/* Button */}
      <Button
        className="!text-white !bg-[#1BCCCC] !min-w-[100%] !py-3 !rounded-lg !mb-8"
        onClick={() => {
          if (currentStep !== totalSteps) {
            handleNextStep();
          } else {
            handleConfirmClick();
          }
        }}
      >
        <span className="font-roboto text-[16px] lowercase first-letter:uppercase">
          {currentStep !== totalSteps ? "Next" : "Confirm"}
        </span>
      </Button>
    </div>
  );
};

// Helper Components
interface Step1InputsInterface {
  foodPickupImages: string[];
  setFoodPickupImages: React.Dispatch<React.SetStateAction<string[]>>;
  hawkerPickupImages: string[];
  setHawkerPickupImages: React.Dispatch<React.SetStateAction<string[]>>;
}
const Step1Inputs = (props: Step1InputsInterface) => {
  const {
    foodPickupImages,
    setFoodPickupImages,
    hawkerPickupImages,
    setHawkerPickupImages
  } = props;

  return (
    <>
      <ScreenTitle title="Step 1 of 2: Submit proof of pick up" />
      <div className="px-[20px] pt-[20px]">
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
      </div>
    </>
  );
};

interface Step2InputsInterface {
  foodDropoffImages: string[];
  setFoodDropoffImages: React.Dispatch<React.SetStateAction<string[]>>;
  consumerDropoffImages: string[];
  setConsumerDropoffImages: React.Dispatch<React.SetStateAction<string[]>>;
}
const Step2Inputs = (props: Step2InputsInterface) => {
  const {
    foodDropoffImages,
    setFoodDropoffImages,
    consumerDropoffImages,
    setConsumerDropoffImages
  } = props;

  return (
    <>
      <ScreenTitle title="Step 2 of 2: Submit proof of delivery" />
      <div className="px-[20px] pt-[20px]">
        <FormImagePicker
          label="Attach a picture of the food at drop off location"
          labelClassNames="text-[14px]"
          filePaths={foodDropoffImages}
          setFilePaths={setFoodDropoffImages}
        />
        <FormImagePicker
          label="Attach a picture of consumer at drop off location"
          labelClassNames="text-[14px]"
          filePaths={consumerDropoffImages}
          setFilePaths={setConsumerDropoffImages}
        />
      </div>
    </>
  );
};
