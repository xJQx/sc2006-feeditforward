import React, { useEffect, useState } from "react";
import { FormButton, FormContainer, ScreenTitle } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { LeftoverFood } from "../../schemas/leftoverFood";
import { useGetServerImage } from "../../hooks";
import { Review } from "../../schemas/review";
import { FaClock } from "react-icons/fa6";
import toast from "react-hot-toast";
import { PickupJobCreate } from "../../schemas/pickupJob";
import { useAuthContext } from "../../contexts/AuthContext";

export const LeftoverFoodRequestScreen = () => {
  const { leftoverFoodId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [leftoverFood, setLeftoverFood] = useState<LeftoverFood>();
  const [hawkerReviewCount, setHawkerReviewCount] = useState(0);
  const [amountSelected, setAmountSelected] = useState(1);
  const [isDelivery, setIsDelivery] = useState(true);

  // Get Leftover Food and Review Count
  useEffect(() => {
    const getHawkerReviewCountData = async (hawkerId: number) => {
      try {
        let reviewData: Review[] = await fetch.get(
          `/reviews/hawkerid/${hawkerId}`
        );
        setHawkerReviewCount(reviewData.length);
      } catch (e) {
        console.log(e);
      }
    };

    const getLeftoverFoodData = async () => {
      try {
        let leftoverFoodData: LeftoverFood = await fetch.get(
          `/leftover-food/${leftoverFoodId}`
        );
        setLeftoverFood(leftoverFoodData);
        getHawkerReviewCountData(leftoverFoodData.hawker_id);
      } catch (e) {
        console.log(e);
      }
    };
    getLeftoverFoodData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAmountSelectedChange = (action: "Increase" | "Decrease") => {
    if (!leftoverFood) return;

    if (action === "Increase" && amountSelected < leftoverFood.amount) {
      setAmountSelected(prev => prev + 1);
    } else if (action === "Decrease" && amountSelected > 1) {
      setAmountSelected(prev => prev - 1);
    }
  };

  const handleSubmitFoodRequest = async () => {
    if (!leftoverFood) return toast.error("No leftover food left!");
    if (!user) return toast.error("Please login.");

    interface RequestBodyInterface {
      pickup_job: PickupJobCreate;
      leftover_food_id: number;
      amount_requested: number;
      option: "Delivery" | "Self Pickup";
    }
    const requestBody: RequestBodyInterface = {
      leftover_food_id: leftoverFood.leftover_food_id,
      amount_requested: amountSelected,
      option: isDelivery ? "Delivery" : "Self Pickup",
      pickup_job: {
        leftover_food_id: leftoverFood.leftover_food_id,
        status: "Available",
        consumer_id: user.user_id,
        description: `Deliver ${leftoverFood.name} ${leftoverFood.amount}x${leftoverFood.unit_of_measurement} from ${leftoverFood.hawker.user.address} (${leftoverFood.hawker.business_name} - Hawker) to ${user.address} (${user.name} - Consumer).
          Estimated to collect food from hawker in 15mins and drop off food at consumer in 30mins.`,
        start_location: {
          type: "Point",
          latitude: leftoverFood.hawker.geometry.latitude,
          longitude: leftoverFood.hawker.geometry.longitude
        },
        end_location: {
          type: "Point",
          latitude: 0,
          longitude: 0
        }
      }
    };

    try {
      const data = await fetch.post(
        "/consumer-controller/request-food",
        requestBody
      );
      if (data) {
        toast.success("Food request submitted. Enjoy your food!");
        navigate(-1);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to submit food request.");
    }
  };

  return (
    <div>
      <ScreenTitle title="Request Leftover Food" />

      {leftoverFood && (
        <div className="mt-8">
          <div className="text-center text-[24px] font-nunito font-bold mb-2">
            {leftoverFood.hawker.business_name}
          </div>

          {/* Food Photo */}
          <LeftoverFoodPhoto leftoverFood={leftoverFood} />

          {/* Food Details */}
          <div className="mt-4 flex flex-col gap-1">
            {/* Name */}
            <div className="text-[24px] font-nunito font-bold leading-tight">
              {leftoverFood.name}
            </div>

            {/* Available */}
            <div className="">
              {leftoverFood.amount} x {leftoverFood.unit_of_measurement}{" "}
              (Available)
            </div>

            {/* Time Passed */}
            <div className="flex flex-row items-center gap-1">
              <FaClock className="w-3 h-3 text-gray-300" />
              <div className="text-[14px] text-gray-400">
                Cooked {leftoverFood.time_passed} ago
              </div>
            </div>

            {/* Ratings and review */}
            <div className="flex flex-row items-center gap-2">
              <span className="">⭐ {leftoverFood.hawker.overall_rating}</span>
              <span className="text-gray-400">({hawkerReviewCount})</span>
              <span
                className="text-brand-primary-active underline"
                onClick={() =>
                  navigate(`/hawker/${leftoverFood.hawker_id}/listings`)
                }
              >
                See Reviews
              </span>
            </div>
          </div>
          <FormContainer onFormSubmit={handleSubmitFoodRequest}>
            {/* Quantity Selector */}
            <div className="flex gap-4 justify-end items-center mr-2 mt-2">
              <div
                className="rounded-full text-gray-300 border border-gray-300 w-7 h-7 flex justify-center items-center active:bg-gray-300 active:text-white"
                onClick={() => handleAmountSelectedChange("Decrease")}
              >
                —
              </div>
              <span>{amountSelected}</span>
              <div
                className="rounded-full bg-brand-primary text-white border border-brand-primary w-7 h-7 flex justify-center items-center active:bg-brand-primary-active"
                onClick={() => handleAmountSelectedChange("Increase")}
              >
                +
              </div>
            </div>

            {/* Deliver Option Selector */}
            <div>
              <div className="font-bold mb-1">Select an option</div>
              <div className="flex flex-col gap-1">
                {/* Delivery */}
                <div
                  className="relative flex items-center gap-2"
                  onClick={() => setIsDelivery(true)}
                >
                  <span className="border-2 border-brand-primary rounded-full w-[16px] h-[16px]" />
                  {isDelivery && (
                    <span className="absolute left-[4px] bg-brand-primary rounded-full w-[8px] h-[8px]" />
                  )}
                  <span className="text-[14px]">Delivery</span>
                </div>
                {/* Self Pickup */}
                <div
                  className="relative flex items-center gap-2"
                  onClick={() => setIsDelivery(false)}
                >
                  <span className="border-2 border-brand-primary rounded-full w-[16px] h-[16px]" />
                  {!isDelivery && (
                    <span className="absolute left-[4px] bg-brand-primary rounded-full w-[8px] h-[8px]" />
                  )}
                  <span className="text-[14px]">Self Pickup</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <FormButton label="Submit" className="mt-6 mb-10" />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

interface LeftoverFoodPhotoProps {
  leftoverFood: LeftoverFood;
}

const LeftoverFoodPhoto = (props: LeftoverFoodPhotoProps) => {
  const { leftoverFood } = props;

  const photoUrl = useGetServerImage(leftoverFood.photo);

  return (
    <img
      src={photoUrl}
      alt={`${leftoverFood.leftover_food_id}-${leftoverFood.name}`}
      className="rounded-lg w-full h-[30vh] object-cover"
    />
  );
};
