import React, { useEffect, useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormSelect,
  ScreenTitle
} from "../../components";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  PRIORITY_REQUEST_HOUSE_CATEGORY,
  PriorityRequestHouseCategory
} from "../../schemas/priorityRequest";
import { Consumer } from "../../schemas/consumer";
import { PiBowlFood } from "react-icons/pi";

export const PriorityRequestSubmitScreen = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [isConsumerAPriority, setIsConsumerAPriority] = useState(false);
  const [householdIncome, setHouseholdIncome] = useState("");
  const [numberOfResidents, setNumberOfResidents] = useState("");
  const [occupation, setOccupation] = useState("");
  const [houseCategory, setHouseCategory] =
    useState<PriorityRequestHouseCategory>(PRIORITY_REQUEST_HOUSE_CATEGORY[0]);

  useEffect(() => {
    const getConsumerPriorityData = async () => {
      if (!user) return;

      const consumerData: Consumer = await fetch.get(
        `/consumer/${user.user_id}`
      );
      if (consumerData) {
        setIsConsumerAPriority(consumerData.priority);
      }
    };
    getConsumerPriorityData();
  }, []);

  const handleSubmitFoodPriorityRequest = async () => {
    // Validations
    if (!user) return toast.error("Please login.");
    if (user.role !== "Consumer")
      return toast.error("Only Consumers are allowed to use this feature");
    if (
      !householdIncome ||
      !numberOfResidents ||
      !occupation ||
      !houseCategory
    ) {
      return toast.error("Please input all fields!");
    }

    // POST Request
    try {
      const data = await fetch.post(
        "/consumer-controller/submit-priority-request",
        {
          consumer_id: user.user_id,
          household_income: householdIncome,
          number_of_residents: numberOfResidents,
          occupation: occupation,
          house_category: houseCategory
        }
      );
      if (data) {
        toast.success("Food priority request submitted!");
        navigate("/settings/profile");
      } else {
        toast.error("Failed to submit food priority request.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isConsumerAPriority) {
    return (
      <>
        <ScreenTitle title="Submit Food Priority Request" />
        <div className="flex justify-center items-center h-[55vh]">
          <div className="flex flex-col items-center gap-2 text-[20px] px-8 text-center animate-bounce">
            <PiBowlFood className="w-10 h-10" />
            Your Priority Request has already been approved!
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <ScreenTitle title="Submit Food Priority Request" />

        <FormContainer onFormSubmit={handleSubmitFoodPriorityRequest}>
          <div className="flex flex-col gap-4 px-2 my-8">
            <FormInput
              type="text"
              label="Household Income"
              placeholder="Enter household income (e.g.: $30k/year)"
              value={householdIncome}
              setValue={setHouseholdIncome}
            />
            <FormInput
              type="number"
              label="Number of Residents"
              placeholder="Enter number of residents"
              value={numberOfResidents}
              setValue={setNumberOfResidents}
            />
            <FormInput
              type="text"
              label="Occupation"
              placeholder="Enter occupation"
              value={occupation}
              setValue={setOccupation}
            />
            <FormSelect
              label="Type of Housing"
              placeholder="Type of Housing"
              value={houseCategory}
              setValue={setHouseCategory}
              optionsList={[...PRIORITY_REQUEST_HOUSE_CATEGORY]}
            />

            <FormButton label="Confirm" className="mt-6" />
          </div>
        </FormContainer>
      </div>
    );
  }
};
