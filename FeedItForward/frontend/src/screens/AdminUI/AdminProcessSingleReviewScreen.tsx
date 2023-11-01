import React, { useEffect, useState } from "react";
import {
  AdminUserDisplayCard,
  Button,
  ScreenSubTitle,
  ScreenTitle
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { reviewsToProcessData } from "../../data/adminData";
import { Review, UserDisplay } from "../../utils/schema";
import { usersData } from "../../data/usersData";

export const AdminProcessSingleReviewScreen = () => {
  let { reviewId } = useParams();
  const [review, setReview] = useState<Review>();
  const [user, setUser] = useState<UserDisplay>();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch data from Backend
    const review: Review = reviewsToProcessData.filter(
      review => review.reviewId === reviewId
    )[0];
    setReview(review);

    const user: UserDisplay = usersData.filter(
      user => user.userId === review?.userId
    )[0];
    setUser(user);
  }, [reviewId]);

  const handleIgnore = () => {
    navigate(-1);
  };
  const handleDelete = () => {
    // TODO
    console.log("handleDelete");
  };

  return (
    <div className="mb-12">
      <ScreenTitle title="Process Review" />

      {/* Review Card */}
      {review && (
        <div className="mt-8 flex flex-row gap-3 px-3 py-2 items-center justify-start border shadow-md rounded-lg">
          <div className="flex flex-row gap-2 w-[40%]">
            {/* Photo */}
            <div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
              <img
                src={
                  user?.img?.src
                    ? user?.img.src
                    : "https://picsum.photos/id/237/200/300"
                }
                alt={user?.img?.alt ? user?.img.alt : "profile pic"}
                className="w-10 aspect-square rounded-full object-cover object-center"
              />
            </div>

            {/* Name and Role */}
            <div className="flex flex-col">
              <span className="text-[18px] font-bold">{user?.name}</span>
              <span className="text-gray-500 text-[14px]">{user?.role}</span>
            </div>
          </div>

          {/* Review Description */}
          <div className="w-[60%] text-[10px] text-gray-500">
            {review.description}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center mt-6">
        <Button
          name="Ignore"
          className="bg-brand-gray"
          onClick={handleIgnore}
        />
        <Button name="Delete" className="bg-[#F26C6C]" onClick={handleDelete} />
      </div>
    </div>
  );
};