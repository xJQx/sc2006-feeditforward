import React, { useEffect, useState } from "react";
import { HawkerCard } from "../../components/Cards";
import { Button } from "../../components";
import { ScreenTitle, SearchBar } from "../../components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import { Hawker } from "../../schemas/hawker";
import { simpleSearch } from "../../utils/search";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const fetch = useFetch();

  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [hawkers, setHawkers] = useState<Hawker[]>([]);
  const [filteredHawkers, setFilteredHawkers] = useState<Hawker[]>([]);

  // Get Hawkers Data from Backend
  useEffect(() => {
    const getHawkersData = async () => {
      try {
        const data = await fetch.get("/user-controller/get-all-hawkers");
        setHawkers(data);
        setFilteredHawkers(data);
      } catch (e) {
        console.log(e);
      }
    };
    getHawkersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchQuery: string) => {
    setFilteredHawkers(
      simpleSearch(hawkers, searchQuery, ["business_name", "food_type"])
    );
  };

  const handleSearchClear = () => {
    setFilteredHawkers(hawkers);
  };

  const handleDeliverOptionButtonOnClick = (
    option: "Delivery" | "Self Pickup"
  ) => {
    switch (option) {
      case "Delivery":
        setIsDeliverySelected(true);
        toast.success("Delivery selected");
        break;
      case "Self Pickup":
        setIsDeliverySelected(false);
        toast.success("Self pickup selected");
        break;
    }
  };

  const handleViewAll = () => {
    navigate("/leftover-food");
  };

  return (
    <div className="p-[10px]">
      {/* Screen Title */}
      <ScreenTitle title="Hawkers" backNav={false} />

      {/* Search Bar */}
      <SearchBar
        searchItemPlaceholder="Hawkers"
        handleSearch={handleSearch}
        handleOnClear={handleSearchClear}
        className="my-[7%]"
      />

      {/* Delivery Option Buttons */}
      <div className="flex justify-start gap-2 pb-[5%] h-[40px]">
        <DeliverOptionButton
          label="Delivery"
          active={isDeliverySelected}
          handleOnClick={handleDeliverOptionButtonOnClick}
        />
        <DeliverOptionButton
          label="Self Pickup"
          active={!isDeliverySelected}
          handleOnClick={handleDeliverOptionButtonOnClick}
        />
      </div>

      {/* Food Options Icons */}
      <div className="flex gap-8 my-2">
        <FoodOptionButton
          label="Nearby"
          icon={{ src: "/images/nearby.png", alt: "nearby icon" }}
        />
        <FoodOptionButton
          label="Halal"
          icon={{ src: "/images/halal.png", alt: "hala icon" }}
        />
        <FoodOptionButton
          label="Japanese"
          icon={{ src: "/images/japanese.png", alt: "japanese food icon" }}
        />
        <FoodOptionButton
          label="Top Picks"
          icon={{ src: "/images/top-picks.png", alt: "top picks icon" }}
        />
      </div>

      <div className="flex flex-col justify-center items-center w-[100%] h-auto my-3">
        {/* View All */}
        <div
          className="flex self-end underline text-[14px]"
          onClick={handleViewAll}
        >
          View All
        </div>

        {/* Hawker Cards */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-2">
          {filteredHawkers.map(hawker => {
            return (
              <HawkerCard
                key={hawker.hawker_id}
                hawkerId={hawker.hawker_id}
                image={hawker.user.profile_picture}
                name={hawker.business_name}
                foodType={hawker.food_type}
                operatingHours={hawker.operating_hours}
                overallRating={hawker.overall_rating}
                address={hawker.user.address}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper Components
interface DeliverOptionButtonProps {
  label: "Delivery" | "Self Pickup";
  active: boolean;
  handleOnClick: (_option: "Delivery" | "Self Pickup") => void;
}

const DeliverOptionButton = (props: DeliverOptionButtonProps) => {
  const { label, active, handleOnClick } = props;

  const activeClassName =
    "!rounded-md !bg-brand-light border border-brand-primary !text-black !px-4 !py-3 text-[14px] !font-roboto !font-normal";
  const inactiveClassName =
    "!rounded-md !bg-brand-gray border border-brand-gray !text-gray-400 !px-4 !py-3 text-[14px] !font-roboto !font-normal";

  return (
    <>
      <Button
        className={active ? activeClassName : inactiveClassName}
        label={label}
        onClick={() => handleOnClick(label)}
      />
    </>
  );
};

interface FoodOptionButtonProps {
  icon: {
    src: string;
    alt: string;
  };
  label: string;
}
const FoodOptionButton = (props: FoodOptionButtonProps) => {
  const { icon, label } = props;

  const handleOnClick = () => {
    toast("💡 Coming soon...");
  };

  return (
    <div className="flex flex-col items-center" onClick={handleOnClick}>
      <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
      <label className="text-[14px]">{label}</label>
    </div>
  );
};
