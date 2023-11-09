import { UserDisplay } from "../schemas/user";
import { Review } from "../schemas/review";
import { usersData } from "./usersData";
import { reviewData } from "./reviewData";

export const userToVerifyData: UserDisplay[] = usersData;

export const reviewsToProcessData: Review[] = reviewData.filter(
  review => review.flagged === true
);
