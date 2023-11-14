import React, { useState } from "react";
import { Review } from "../../schemas/review";
import { useGetServerImage } from "../../hooks";
import { FaRegFlag, FaFlag, FaPencil } from "react-icons/fa6";
import { Button } from "../Button";
import useFetch from "../../hooks/useFetch";
import { FormInput } from "../Form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HawkerListingReviewCardProps {
  review: Review;
}

export const HawkerListingReviewCard = (
  props: HawkerListingReviewCardProps
) => {
  const { review } = props;
  const { user } = useAuthContext();
  const photoUrl = useGetServerImage(review.photos[0]);
  const navigate = useNavigate();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isReviewFlagged, setIsReviewFlagged] = useState(review.flagged);

  const handleConfirmFlagReview = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleEditReview = () => {
    navigate(`/review/edit/${review.review_id}`);
  };

  return (
    <div className="flex items-center">
      <img
        src={photoUrl}
        alt={review.review_id.toString()}
        className="w-20 h-20 rounded-md"
      />
      <div className="flex flex-1 flex-col justify-center px-3">
        <div className="flex flex-row items-center gap-1 font-bold">
          {review.consumer.user.name}
          {/* Edit Icon */}
          {review.consumer_id === user?.user_id && (
            <FaPencil
              className="w-3 h-3 text-brand-primary-active"
              onClick={handleEditReview}
            />
          )}
          {/* Flag Icon */}
          {isReviewFlagged ? (
            <FaFlag
              className="w-3 h-3 text-red-500"
              onClick={() => toast.success("Review is already flagged")}
            />
          ) : (
            <FaRegFlag
              className="w-3 h-3 text-red-500"
              onClick={handleConfirmFlagReview}
            />
          )}
        </div>
        <div className="text-[12px] text-gray-500">{review.description}</div>
        <div className="text-[12px] text-gray-500">
          Rating: {review.rating.toFixed(1)}/5.0
        </div>
      </div>

      {isConfirmationModalOpen && (
        <FlagReviewConfirmationModal
          review={review}
          setIsModalOpen={setIsConfirmationModalOpen}
          setIsReviewFlagged={setIsReviewFlagged}
        />
      )}
    </div>
  );
};

interface FlagReviewConfirmationModalProps {
  review: Review;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReviewFlagged: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlagReviewConfirmationModal = (
  props: FlagReviewConfirmationModalProps
) => {
  const { review, setIsModalOpen, setIsReviewFlagged } = props;
  const { user } = useAuthContext();
  const fetch = useFetch();

  const [flaggedReason, setFlaggedReason] = useState("");

  const handleFlagReview = async () => {
    if (!flaggedReason) {
      return toast.error("Please give reason for flagging review");
    }

    const reviewResponse: Review = await fetch.put(
      "/user-controller/flag-review",
      {
        review_id: review.review_id,
        flagged_reason: flaggedReason,
        user_id: user?.user_id
      }
    );

    if (reviewResponse.flagged) {
      setIsModalOpen(false);
      toast.success("Review flagged!");
      setIsReviewFlagged(true);
    } else {
      toast.error("Failed to flag review.");
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[70%] rounded-md shadow-md bg-opacity-95">
      <div className="flex flex-col items-center my-4 gap-2">
        <div className="font-bold text-[18px]">Flag Review Confirmation</div>
        <div className="text-center">
          Are you sure you want to flag the review made by{" "}
          <span className="font-bold">{review.consumer.user.name}</span>?
        </div>

        {/* Flagged Reason */}
        <div className="my-3">
          <FormInput
            type="text"
            label="Reason"
            value={flaggedReason}
            setValue={setFlaggedReason}
            placeholder="Enter your flag reason"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4">
          <Button
            label="Cancel"
            className="!font-roboto !bg-brand-gray !font-normal"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            label="Confirm"
            className="!font-roboto !bg-red-400 !font-normal"
            onClick={handleFlagReview}
          />
        </div>
      </div>
    </div>
  );
};
