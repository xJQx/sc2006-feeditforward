import React from "react";
import { ScreenTitle } from "../../components";
import { SearchBar } from "../../components";
import { Review } from "../../utils/schema";
import { useNavigate } from "react-router-dom";
import { reviewsToProcessData } from "../../data/adminData";
import { usersData } from "../../data/usersData";

export const AdminProcessReviewsScreen = () => {
  // TODO: fetch data from backend

  const handleSearchReviews = (searchKey: string) => {
    // TODO: Search for reviews
    console.log(`Search for reviews with searchKey ${searchKey}`);
  };

  return (
    <div>
      <ScreenTitle title="Process Review" />
      <div className="flex flex-col justify-center mt-12 gap-10">
        <SearchBar
          searchItemPlaceholder="reviews"
          handleSearch={handleSearchReviews}
        />
        <ReviewsToProcess reviewsToProcessData={reviewsToProcessData} />
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
        {reviewsToProcessData.map(review => {
          return (
            review.flagged && (
              <ReviewToProcessItem key={review.user_id} {...review} />
            )
          );
        })}
      </ul>
    </div>
  );
};

const ReviewToProcessItem = (props: Review) => {
  const { review_id, user_id, description } = props;
  const { name, role, profile_picture } = usersData.filter(
    user => user.user_id === user_id
  )[0];
  const navigate = useNavigate();

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
                ? profile_picture
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
