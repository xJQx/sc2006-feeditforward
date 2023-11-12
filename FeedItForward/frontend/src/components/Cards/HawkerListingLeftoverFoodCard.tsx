import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftoverFood } from "../../schemas/leftoverFood";
import { useGetServerImage } from "../../hooks";
import { FaClock } from "react-icons/fa6";

interface HawkerListingLeftoverFoodCardProps {
  leftoverFood: LeftoverFood;
}

export const HawkerListingLeftoverFoodCard = (
  props: HawkerListingLeftoverFoodCardProps
) => {
  const { leftoverFood } = props;

  const navigate = useNavigate();
  const photoUrl = useGetServerImage(leftoverFood.photo);

  const handleOnClick = () => {
    navigate(`/leftover-food/${leftoverFood.leftover_food_id}/request`);
  };

  return (
    <div onClick={handleOnClick}>
      <div className="rounded-md">
        <img
          src={photoUrl}
          alt="leftover food"
          className="rounded-md w-full h-[125px] object-cover"
        />
        <div className="flex flex-col text-start pt-1">
          <div className="font-bold">{leftoverFood.name}</div>
          <div className="text-[14px] text-gray-400">
            {leftoverFood.amount} x {leftoverFood.unit_of_measurement}
          </div>
          <div className="flex flex-row items-center gap-1">
            <FaClock className="w-3 h-3 text-gray-300" />
            <div className="text-[12px] text-gray-400">
              Cooked {leftoverFood.time_passed} ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
