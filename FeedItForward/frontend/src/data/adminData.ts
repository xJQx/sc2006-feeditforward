import { Review, UserDisplay } from "../utils/schema";
import { usersData } from "./usersData";

export const userToVerifyData: UserDisplay[] = usersData;

export const reviewsToProcessData: Review[] = [
  {
    reviewId: "1",
    userId: "1",
    description:
      "worst customer i have ever met! shouted at me for being 1 minute late and did not even leave a tip!!! 😠😠",
    approved: false
  },
  {
    reviewId: "2",
    userId: "2",
    description:
      "driver showed up 80min late!! the worse thing is that he drank my milo right in front of my door steps 🤮 ",
    approved: false
  },
  {
    reviewId: "3",
    userId: "3",
    description:
      "DO NOT get food from this hawker!!! the food smells bad and i got food poisoning 1 day after eating this 😢🤒",
    approved: true
  }
];
