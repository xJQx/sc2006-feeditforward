import React, { useEffect, useState } from "react";
import { Button, ScreenSubTitle, ScreenTitle } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { UserDisplay } from "../../schemas/user";
import { REVIEW_ACTION, Review } from "../../schemas/review";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";

export const AdminProcessSingleReviewScreen = () => {
  let { reviewId } = useParams();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [review, setReview] = useState<Review>();
  const [consumerUser, setConsumerUser] = useState<UserDisplay>();
  const [imageUrl, setImageUrl] = useState("");

  // Fetch data from backend
  useEffect(() => {
    const getReviewData = async () => {
      const data: Review = await fetch.get(`/review/${reviewId}`);
      setReview(data);
      setConsumerUser(data.consumer.user);
    };

    getReviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewId]);

  useEffect(() => {
    const getImageFile = async () => {
      if (consumerUser) {
        try {
          const url = await fetch.retrieve_image(consumerUser.profile_picture);
          setImageUrl(url);
        } catch (e: any) {
          console.log(e);
        }
      }
    };
    getImageFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consumerUser]);

  const handleCancel = () => {
    navigate(-1);
  };
  const handleIgnore = async () => {
    const ignoredReview: Review = await fetch.post(
      `/admin-controller/process-review/${reviewId}`,
      {
        review_id: reviewId,
        action: REVIEW_ACTION[1]
      }
    );

    if (ignoredReview.flagged === false) {
      toast.success("Review ignored");
      navigate(-1);
    } else {
      toast.error("Failed to ignore review");
    }
  };
  const handleDelete = async () => {
    const deletedReview: Review = await fetch.post(
      `/admin-controller/process-review/${reviewId}`,
      {
        review_id: reviewId,
        action: REVIEW_ACTION[0]
      }
    );

    if (deletedReview.flagged === true) {
      toast.success("Review deleted");
      navigate(-1);
    } else {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="mb-12">
      <ScreenTitle title="Process Review" />

      <ScreenSubTitle title="Flagged Review" />

      {/* Review Card */}
      {review && (
        <div className="mt-6 flex flex-row gap-3 px-3 py-2 items-center justify-start border shadow-md rounded-lg">
          <div className="flex flex-row gap-2 w-[40%]">
            {/* Photo */}
            <div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center">
              <img
                src={
                  consumerUser?.profile_picture
                    ? imageUrl
                    : "https://picsum.photos/id/237/200/300"
                }
                alt={
                  consumerUser?.profile_picture
                    ? `${consumerUser?.profile_picture}'s profile pic`
                    : "profile pic"
                }
                className="w-10 aspect-square rounded-full object-cover object-center"
              />
            </div>

            {/* Name and Role */}
            <div className="flex flex-col">
              <span className="text-[18px] font-bold">
                {consumerUser?.name}
              </span>
              <span className="text-gray-500 text-[14px]">
                {consumerUser?.role}
              </span>
            </div>
          </div>

          {/* Review Description */}
          <div className="w-[60%] text-[10px] text-gray-500">
            {review.description}
          </div>
        </div>
      )}

      {/* Flag Reason */}
      <ScreenSubTitle title="Flagged Reason" />
      {review && review.flagged && (
        <div className="text-[14px] mt-2">{review.flagged_reason}</div>
      )}

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center my-12">
        <Button
          label="Cancel"
          className="!bg-brand-gray"
          onClick={handleCancel}
        />
        <Button
          label="Ignore"
          className="!bg-brand-secondary"
          onClick={handleIgnore}
        />
        <Button
          label="Delete"
          className="!bg-[#F26C6C]"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
