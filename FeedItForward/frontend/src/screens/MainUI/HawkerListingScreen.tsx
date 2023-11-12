import React, { useEffect, useState } from "react";
import {
  HawkerListingLeftoverFoodCard,
  HawkerListingReviewCard
} from "../../components/Cards";
import { useNavigate, useParams } from "react-router-dom";
import { LeftoverFood } from "../../schemas/leftoverFood";
import useFetch from "../../hooks/useFetch";
import { Hawker } from "../../schemas/hawker";
import { useGetServerImage } from "../../hooks";
import { ButtonBackNavigation, ScreenSubTitle } from "../../components";
import { FaPlus } from "react-icons/fa6";
import { Review } from "../../schemas/review";

export const HawkerListingScreen = () => {
  const { hawkerId } = useParams();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [leftoverFoods, setLeftoverFoods] = useState<LeftoverFood[]>([]);
  const [hawker, setHawker] = useState<Hawker>();
  const [reviews, setReviews] = useState<Review[]>([]);

  // Get Hawker's Leftover Food
  useEffect(() => {
    const getHawkerLeftoverFoodsData = async () => {
      try {
        let data: LeftoverFood[] = await fetch.get(
          `/leftover-foods/hawkerid/${hawkerId}`
        );
        data = data.filter(food => food.available === true);
        if (data.length > 0) {
          setLeftoverFoods(data);
          setHawker(data[0].hawker);
        }

        // Get Review Count
        const hawkerReviews = await fetch.get(`/reviews/hawkerid/${hawkerId}`);
        setReviews(hawkerReviews);
      } catch (e) {
        console.log(e);
      }
    };
    getHawkerLeftoverFoodsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hawkerId]);

  const handleAddReview = () => {
    navigate(`/review/add/${hawkerId}`);
  };

  return (
    <div className="mb-6">
      {hawker && (
        <div className="">
          <HawkerBanner
            businessName={hawker.business_name}
            profilePicture={hawker.user.profile_picture}
          />
          {/* Hawker Info */}
          <div className="absolute left-1/2 mt-[20vh] -translate-y-[60%] -translate-x-[50%] w-2/3 rounded-lg shadow-lg bg-white text-center pt-3">
            {/* Business Name */}
            <span className="font-bold text-[28px] leading-tight px-3">
              {hawker.business_name}
            </span>

            {/* Details */}
            <div className="flex flex-col p-[3px] text-[14px] mt-3">
              {/* Ratings and reviews */}
              <div className="border-y border-gray-300 py-[2px]">
                <span className="px-3">
                  ⭐️ {hawker.overall_rating} ({reviews.length}) • Ratings and
                  reviews
                </span>
              </div>
              {/* Food Type | Operating Hours */}
              <div className="border-b border-gray-300 py-[2px]">
                <span className="px-3">
                  {hawker.food_type} • {hawker.operating_hours}
                </span>
              </div>
              {/* Address */}
              <div className="py-[2px]">
                <span className="px-3">
                  {hawker.user.address.substring(0, 24)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leftover Foods */}
      <div className="mt-[32vh]">
        <ScreenSubTitle title="Leftover Food" />
        {leftoverFoods.length > 0 ? (
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-2">
            {leftoverFoods.map(leftoverFood => {
              return (
                <HawkerListingLeftoverFoodCard
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

      {/* Reviews */}
      <div>
        {/* Header */}
        <div className="flex flex-row items-center mt-6 gap-1">
          <ScreenSubTitle title="Reviews" className="!mt-0" />
          <span className="text-[12px] font-bold">({reviews.length})</span>
          <div onClick={handleAddReview}>
            <FaPlus title="Add Review" />
          </div>
        </div>
        {/* Reviews */}
        <div className="flex flex-col gap-3">
          {reviews.map(review => (
            <HawkerListingReviewCard
              key={`review ${review.review_id}`}
              review={review}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface HawkerBannerProps {
  profilePicture: string;
  businessName: string;
}

const HawkerBanner = (props: HawkerBannerProps) => {
  const { profilePicture, businessName } = props;

  const profilePictureUrl = useGetServerImage(profilePicture);

  return (
    <>
      <div className="mt-3">
        <ButtonBackNavigation />
      </div>
      <img
        src={profilePictureUrl}
        alt={businessName}
        className="absolute left-0 top-0 -z-10 object-cover h-[30vh] w-full"
      />
    </>
  );
};
