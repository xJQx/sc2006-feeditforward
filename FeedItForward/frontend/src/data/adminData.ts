import { Review, UserDisplay } from "../utils/schema";

export const userToVerifyData: UserDisplay[] = [
  {
    userId: "1",
    name: "John",
    role: "Consumer",
    img: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  },
  {
    userId: "2",
    name: "Tess",
    role: "Driver",
    img: {
      src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  },
  {
    userId: "3",
    name: "Jane",
    role: "Hawker",
    img: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "profile pic"
    }
  }
];

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
