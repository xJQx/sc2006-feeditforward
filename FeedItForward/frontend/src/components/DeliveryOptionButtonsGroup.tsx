import React, { useState } from "react";
import { Button } from "./Button";
import toast from "react-hot-toast";

export const DeliveryOptionButtonsGroup = () => {
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);

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

  return (
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
  );
};

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
