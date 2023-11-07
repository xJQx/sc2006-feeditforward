import { UserDisplay } from "../schemas/user";
import { Review } from "../schemas/review";
import { usersData } from "./usersData";

export const userToVerifyData: UserDisplay[] = usersData;

export const reviewsToProcessData: Review[] = [
  {
    review_id: 5,
    user_id: 1,
    description:
      "worst customer i have ever met! shouted at me for being 1 minute late and did not even leave a tip!!! 😠😠",
    rating: 1.8,
    flagged: true
  },
  {
    review_id: 6,
    user_id: 2,
    description:
      "driver showed up 80min late!! the worse thing is that he drank my milo right in front of my door steps 🤮 ",
    rating: 0.0,
    flagged: true
  },
  {
    review_id: 7,
    user_id: 3,
    description:
      "DO NOT get food from this hawker!!! the food smells bad and i got food poisoning 1 day after eating this 😢🤒",
    rating: 2.0,
    flagged: true
  }
];
