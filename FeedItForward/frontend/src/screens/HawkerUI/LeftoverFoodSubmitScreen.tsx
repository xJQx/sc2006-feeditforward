import React, { useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  ScreenTitle
} from "../../components";
import FormImagePicker from "../../components/Form/FormImagePicker";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const LeftoverFoodSubmitScreen = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [name, setName] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [amount, setAmount] = useState(0);
  const [timePassed, setTimePassed] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmitLeftoverFood = async () => {
    // Validations
    if (!user) return toast.error("Please login.");
    if (user.role !== "Hawker")
      return toast.error("Only Hawkers are allowed to use this feature");
    if (
      !name ||
      !unitOfMeasurement ||
      !amount ||
      !timePassed ||
      photos.length === 0
    ) {
      return toast.error("Please input all fields!");
    }
    if (amount <= 0) {
      return toast.error("Amount must be a positive number.");
    }

    // POST Request
    try {
      const data = await fetch.post("/hawker-controller/submit-leftover-food", {
        name: name,
        unit_of_measurement: unitOfMeasurement,
        amount: amount,
        photo: photos[0],
        time_passed: timePassed,
        hawker_id: user.user_id
      });
      if (data) {
        toast.success("Leftover food added!");
        navigate(`/hawker/${user.user_id}/listings`);
      } else {
        toast.error("Failed to add leftover food.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ScreenTitle title="Submit Leftover Food" />

      <FormContainer onFormSubmit={handleSubmitLeftoverFood}>
        <div className="flex flex-col gap-4 px-2 mt-6 mb-8">
          <div className="flex gap-2">
            <FormInput
              type="text"
              label="Name"
              placeholder="Enter name"
              value={name}
              setValue={setName}
            />
            <FormInput
              type="number"
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              setValue={setAmount}
            />
          </div>
          <FormInput
            type="text"
            label="Unit of Measurement"
            placeholder="Enter unit of measurement (e.g.: packet)"
            value={unitOfMeasurement}
            setValue={setUnitOfMeasurement}
          />
          <FormInput
            type="text"
            label="Time Passed"
            placeholder="Enter time passed (e.g.: 1 hour)"
            value={timePassed}
            setValue={setTimePassed}
          />
          <FormImagePicker
            label="Attach a photo of the food"
            filePaths={photos}
            setFilePaths={setPhotos}
            labelClassNames="font-bold text-[18px]"
          />
          <FormButton label="Confirm" />
        </div>
      </FormContainer>
    </div>
  );
};
