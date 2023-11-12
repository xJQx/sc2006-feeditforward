import React, { useEffect, useState } from "react";
import {
  DeliveryOptionButtonsGroup,
  ScreenTitle,
  SearchBar
} from "../../components";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { simpleSearch } from "../../utils/search";
import { LeftoverFood } from "../../schemas/leftoverFood";
import { useGetServerImage } from "../../hooks";
import { FaClock } from "react-icons/fa6";

export const LeftoverFoodScreen = () => {
  const fetch = useFetch();

  const [leftoverFoods, setLeftoverFoods] = useState<LeftoverFood[]>([]);
  const [filteredLeftoverFoods, setFilteredLeftoverFoods] = useState<
    LeftoverFood[]
  >([]);

  // Get Leftover Food
  useEffect(() => {
    const getLeftoverFoodsData = async () => {
      try {
        let data: LeftoverFood[] = await fetch.get("/leftover-foods/available");
        if (data.length > 0) {
          setLeftoverFoods(data);
          setFilteredLeftoverFoods(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getLeftoverFoodsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchQuery: string) => {
    setFilteredLeftoverFoods(
      simpleSearch(leftoverFoods, searchQuery, ["name"])
    );
  };

  const handleSearchClear = () => {
    setFilteredLeftoverFoods(leftoverFoods);
  };

  return (
    <div className="mb-8">
      {/* Screen Title */}
      <ScreenTitle title="Leftover Food" />

      {/* Search Bar */}
      <SearchBar
        searchItemPlaceholder="Leftover Food"
        handleSearch={handleSearch}
        handleOnClear={handleSearchClear}
        className="my-[7%]"
      />

      {/* Delivery Option Buttons */}
      <DeliveryOptionButtonsGroup />

      {/* Leftover Foods */}
      {filteredLeftoverFoods.length > 0 ? (
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-2">
          {filteredLeftoverFoods.map(leftoverFood => {
            return (
              <LeftoverFoodCard
                key={leftoverFood.leftover_food_id}
                leftoverFood={leftoverFood}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-1 text-[14px] text-gray-500">
          No Leftover Food available!
        </div>
      )}
    </div>
  );
};

interface LeftoverFoodCardProps {
  leftoverFood: LeftoverFood;
}

export const LeftoverFoodCard = (props: LeftoverFoodCardProps) => {
  const { leftoverFood } = props;

  const navigate = useNavigate();
  const photoUrl = useGetServerImage(leftoverFood.photo);

  const handleOnClick = () => {
    navigate(`/leftover-food/${leftoverFood.leftover_food_id}/request`);
  };

  return (
    <div onClick={handleOnClick}>
      <div className="rounded-md shadow-md h-full">
        {/* Photo */}
        <img
          src={photoUrl}
          alt="leftover food"
          className="rounded-md w-full h-[125px] object-cover"
        />

        {/* Details */}
        <div className="flex flex-col text-start py-2 px-2">
          <div className="font-bold text-[18px]">{leftoverFood.name}</div>
          <div className="text-[12px] mb-1">
            {leftoverFood.hawker.business_name} (
            {leftoverFood.hawker.overall_rating}⭐)
          </div>
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
