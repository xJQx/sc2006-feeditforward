import React, { useState, useEffect } from "react";
import { ScreenTitle } from "../../components";
import { SearchBar } from "../../components";
import { Review } from "../../schemas/review";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useGetServerImage } from "../../hooks";

export const AdminProcessReviewsScreen = () => {
  const fetch = useFetch();
  const [reviewsToProcessData, setReviewsToProcessData] = useState<Review[]>(
    []
  );
  const [filteredReviewsToProcessData, setFilteredReviewsToProcessData] =
    useState<Review[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  // Get users to verify
  useEffect(() => {
    const getReviewsToProcessData = async () => {
      const reviews: Review[] = await fetch.get("/reviews");
      setReviewsToProcessData(
        reviews.filter(review => review.flagged === true)
      );
    };
    getReviewsToProcessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search Feature
  const handleSearchReviews = (searchQuery: string) => {
    const filteredReviews = reviewsToProcessData.filter(review => {
      // search for user or description
      if (
        review.consumer.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        review.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return true;
      }

      return false;
    });

    setFilteredReviewsToProcessData(filteredReviews);
    setIsSearch(true);
  };
  const handleOnSearchClear = () => {
    setFilteredReviewsToProcessData([]);
    setIsSearch(false);
  };

  return (
    <div>
      <ScreenTitle title="Process Review" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <SearchBar
          searchItemPlaceholder="reviews or user"
          handleSearch={handleSearchReviews}
          handleOnClear={handleOnSearchClear}
        />
        {isSearch ? (
          <ReviewsToProcess
            reviewsToProcessData={filteredReviewsToProcessData}
          />
        ) : (
          <ReviewsToProcess reviewsToProcessData={reviewsToProcessData} />
        )}
      </div>
    </div>
  );
};

// ---------- Helper Components ---------- //
interface ReviewsToProcessProps {
  reviewsToProcessData: Review[];
}

const ReviewsToProcess = (props: ReviewsToProcessProps) => {
  const { reviewsToProcessData } = props;

  return (
    <div className="border-2 border-brand-darkgray rounded-lg max-h-[25rem] min-h-[22rem] overflow-y-auto">
      <ul className="list-none">
        {reviewsToProcessData.map(review => (
          <ReviewToProcessItem key={review.review_id} {...review} />
        ))}
      </ul>
    </div>
  );
};

const ReviewToProcessItem = (props: Review) => {
  const { review_id, consumer, description } = props;
  const { name, role, profile_picture } = consumer.user;
  const navigate = useNavigate();
  const profilePictureImageUrl = useGetServerImage(profile_picture);

  const handleOnClick = () => {
    navigate(`/admin/process-review/${review_id}`);
  };

  return (
    <li
      className="flex flex-row gap-2 px-5 py-3 items-center justify-start border-b-2 border-brand-darkgray active:bg-brand-darkgray"
      onClick={handleOnClick}
    >
      <div className="flex flex-row gap-2 w-[50%]">
        {/* Photo */}
        <div className="bg-gray-300 w-14 h-14 rounded-full flex justify-center items-center">
          <img
            src={
              profile_picture
                ? profilePictureImageUrl
                : "https://picsum.photos/id/237/200/300"
            }
            alt={profile_picture ? `${name}'s profile pic` : "profile pic"}
            className="w-12 aspect-square rounded-full object-cover object-center"
          />
        </div>

        {/* Name and Role */}
        <div>
          <div className="text-[20px] font-bold">{name}</div>
          <span className="text-gray-500 text-[16px]">{role}</span>
        </div>
      </div>

      {/* Review Description */}
      <div className="w-[50%] text-[10px] text-gray-500">{description}</div>
    </li>
  );
};
