import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServerImage } from "../../hooks";

interface HawkerCardProps {
  hawkerId: number;
  image: string;
  name: string;
  foodType: string;
  operatingHours: string;
  overallRating: number;
  address: string;
}

export const HawkerCard = (props: HawkerCardProps) => {
  const {
    hawkerId,
    image,
    name,
    foodType,
    operatingHours,
    overallRating,
    address
  } = props;

  const navigate = useNavigate();
  const imageUrl = useGetServerImage(image);

  const handleClick = () => {
    navigate(`/hawker/${hawkerId}/listings`);
  };

  return (
    <div
      className="min-h-[150px] h-full w-full rounded shadow-md"
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={name}
        className="rounded-tr rounded-tl w-full h-[100px] object-cover"
      />
      <div className="flex flex-col justify-center py-2 px-3">
        <p className="flex font-bold text-[14px] text-left leading-tight">
          {name}
        </p>
        <div className="pt-1 flex flex-col gap-[2px]">
          <p className="text-[12px] text-left text-gray-500">
            {foodType} | {operatingHours}
          </p>
          <p className="text-[10px] text-gray-500">
            {address.substring(0, 24)}...
          </p>
          <p className="text-[12px] text-gray-500 flex items-center gap-[2px]">
            <span className="">⭐</span>
            <span className="">{overallRating}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
