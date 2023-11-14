import React, { useState, useEffect } from "react";
import {
  FormTextArea,
  FormImagePicker,
  FormSlider
} from "../../components/Form";
import { ScreenTitle } from "../../components";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Review, ReviewUpdate } from "../../schemas/review";
import toast from "react-hot-toast";

export const ReviewEditScreen = () => {
  const { reviewId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [review, setReview] = useState<Review>();
  const [description, setDescription] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(3.0);

  // Fetch Review
  useEffect(() => {
    const getReviewData = async () => {
      const data: Review = await fetch.get(`/review/${reviewId}`);

      setReview(data);
      setDescription(data.description);
      setReviewImages(data.photos);
      setRating(data.rating);
    };
    getReviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewId]);

  const handleOnCancel = () => {
    navigate(-1);
  };

  const handleOnSave = async () => {
    // Validation
    if (!user) return toast.error("Please login.");
    if (!review) return toast.error("Review does not exist");
    if (reviewImages.length === 0 || !description || !rating) {
      return toast.error("Please input all fields");
    }

    const updatedReview: ReviewUpdate = {
      description: description,
      rating: rating,
      photos: reviewImages,
      consumer_id: user.user_id,
      review_id: review.review_id,
      flagged: review.flagged,
      flagged_reason: review.flagged_reason ?? ""
    };

    const data = await fetch.put(
      "/consumer-controller/edit-review",
      updatedReview
    );
    if (data) {
      toast.success("Review updated");
      navigate(-1);
    } else {
      toast.error("Failed to update review");
    }
  };

  return (
    <div>
      <ScreenTitle title="Edit review" />
      <div style={{ padding: "20px" }}>
        {/* Photo */}
        <FormImagePicker
          label="Photo"
          isEdit
          filePaths={reviewImages}
          setFilePaths={setReviewImages}
        />

        {/* Description */}
        <FormTextArea
          label="Description"
          value={description}
          setValue={setDescription}
          isEdit
        />

        {/* Rating */}
        <FormSlider label="Rating" value={rating} setValue={setRating} />

        <div className="flex gap-2 mt-4">
          <Button
            className="!text-[#1BCCCC] !w-full !border-[#1BCCCC] !py-2"
            onClick={handleOnCancel}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            className="!text-white !bg-[#1BCCCC] !w-full !py-2"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
