import React, { useState } from "react";
import {
  FormTextArea,
  FormImagePicker,
  FormSlider
} from "../../components/Form";
import { ScreenTitle } from "../../components";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { ReviewCreate } from "../../schemas/review";

export const ReviewAddScreen = () => {
  const { hawkerId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const [description, setDescription] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(3.0);

  const handleSubmitClick = async () => {
    // Validation
    if (!user) return toast.error("Please login.");
    if (!hawkerId) return toast.error("Hawker does not exist");
    if (reviewImages.length === 0 || !description || !rating) {
      return toast.error("Please input all fields");
    }

    const newReview: ReviewCreate = {
      description: description,
      rating: rating,
      photos: reviewImages,
      consumer_id: user.user_id,
      hawker_id: parseInt(hawkerId)
    };

    const data = await fetch.post(
      "/consumer-controller/submit-review",
      newReview
    );
    if (data) {
      toast.success("Review added");
      navigate(-1);
    } else {
      toast.error("Failed to add review");
    }
  };

  return (
    <div>
      <ScreenTitle title="Add review" />
      <div style={{ padding: "20px" }}>
        {/* Photo */}
        <FormImagePicker
          filePaths={reviewImages}
          label="Photo"
          setFilePaths={setReviewImages}
        />

        {/* Description */}
        <FormTextArea
          label="Description"
          value={description}
          setValue={setDescription}
        />

        {/* Rating */}
        <FormSlider label="Rating" value={rating} setValue={setRating} />

        {/* Button */}
        <Button
          className="!text-white !bg-[#1BCCCC] !min-w-[100%] !py-2 !rounded-lg text-[18px] !mt-4"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
