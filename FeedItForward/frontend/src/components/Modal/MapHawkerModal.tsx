import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { BiSolidDirectionRight } from "react-icons/bi";
import { Hawker } from "../../utils/schema";
import toast from "react-hot-toast";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { ModalCloseButton } from "./ModalCloseButton";

interface MapHawkerModalProps {
  hawker: Hawker;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegistered: boolean;
}

export const MapHawkerModal = (props: MapHawkerModalProps) => {
  const { hawker, isModalOpen, setModalOpen, isRegistered } = props;
  const navigate = useNavigate();

  const handleDirectionOnClick = () => {
    // TODO
    toast("TODO: Show Directions");
  };
  const handleAddReview = () => {
    if (hawker.hawkerId === "0") {
      return toast.error(
        `Sorry. ${hawker.businessName} is not registered with FeedItForward.`
      );
    }

    navigate(`/review/add/${hawker.hawkerId}`);
  };
  const handleViewReviews = () => {
    if (hawker.hawkerId === "0") {
      return toast.error(
        `Sorry. ${hawker.businessName} is not registered with FeedItForward.`
      );
    }

    navigate(`/reviews/${hawker.hawkerId}`);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      shouldCloseOnOverlayClick={true}
      className="font-roboto"
      style={{
        overlay: {
          minHeight: "50%",
          maxHeight: "70%",
          height: "max-content",
          margin: "auto",
          width: "80%",
          backgroundColor: "#E3F6F5",
          opacity: "0.9",
          borderRadius: "0.5em"
        },
        content: {
          overflow: "scroll",
          height: "100%"
        }
      }}
    >
      <div className="flex flex-col items-center">
        {/* Registered/Public Tag */}
        <div
          className={`absolute -translate-y-1/2 flex justify-center items-center w-max px-2 py-[1px] text-[12px] font-bold rounded 
            ${
              isRegistered
                ? "bg-brand-tertiary-active"
                : "bg-brand-secondary-active"
            }`}
        >
          {isRegistered ? "Registered" : "Public"}
        </div>

        {/* Close Button */}
        <ModalCloseButton setIsModalOpen={setModalOpen} />

        {/* Main Body Content */}
        <div className="flex flex-col py-[12px] px-4">
          {/* Title - Business Name */}
          <div className="text-center font-bold text-[24px] leading-tight mt-[12px]">
            {hawker.businessName}
          </div>

          {/* Subtitle - Type of Food */}
          <div className="text-center italic text-[12px]">
            {hawker.foodType}
          </div>

          {/* Ratings */}
          <div className="flex flex-row justify-center items-center gap-1 mb-2">
            <div className="font-bold text-[14px]">
              {hawker.overallRating.toFixed(1)}
            </div>
            <AiFillStar className="text-[#ffbe10] w-4 h-4" />
            <div className="font-light text-[12px]">
              ({hawker.reviews ? `${hawker.reviews.length}+` : 0})
            </div>
          </div>

          {/* Image */}
          <img
            src={
              hawker.img.src
                ? hawker.img.src
                : "https://placehold.co/600x400/EEE/31343C?text=No Photo"
            }
            alt={hawker.img.alt}
            className="h-[200px] w-full m-auto object-cover rounded-sm"
          />

          {/* Details */}
          <div className="flex flex-col mt-3 text-[14px]">
            <div className="flex gap-1">
              <div className="font-bold">Contact No.:</div>
              <span>{hawker.contactNumber}</span>
            </div>
            <div className="flex gap-1">
              <div className="font-bold">Email:</div>
              <span>{hawker.email}</span>
            </div>
            <div id="address">
              <span className="font-bold">Address:</span>
              <span className="ml-1 leading-tight text-[12px]">
                {hawker.address}
              </span>
              <span
                className="ml-1 translate-y-[3px] inline-block"
                onClick={handleDirectionOnClick}
              >
                <BiSolidDirectionRight className="text-brand-primary-active" />
              </span>
            </div>
          </div>

          {/* Review Buttons */}
          <div className="flex flex-row gap-2 mt-4 mb-3 text-[14px]">
            <Button
              label="Add Review"
              className="!font-roboto !font-normal !rounded !bg-transparent border border-brand-tertiary-active text-brand-tertiary-active"
              onClick={handleAddReview}
            />
            <Button
              label="View Reviews"
              className="!font-roboto !font-normal !rounded !bg-brand-tertiary-active"
              onClick={handleViewReviews}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
