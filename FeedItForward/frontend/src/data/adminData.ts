import { UserDisplay } from "../schemas/user";
import { Review } from "../schemas/review";
import { usersData } from "./usersData";
import { reviewData } from "./reviewData";
import { Admin } from "../schemas/admin";

export const userToVerifyData: UserDisplay[] = usersData;

export const reviewsToProcessData: Review[] = reviewData.filter(
  review => review.flagged === true
);


export const adminData: Admin[] = [
{
  admin_id:5,
  user_id: 5, 
  user: 
    {
      user_id: 5,
      name: "Agent Alex",
      role: "Admin",
      email: "alex@gmail.com",
      contact_number: "97367190",
      address:
        "Blk 403 Bedok North Avenue 3,  #01-241, 460403",
      profile_picture: 
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      
      ban: false
    
  }
}, 
{
  admin_id:6, 
  user_id: 6, 
  user: 
  {
    user_id: 6,
    name: "Agent Mary",
    role: "Admin",
    email: "mary@gmail.com",
    contact_number: "97086452",
    address:
      "Blk 19 Marsiling Lane, #01-291, 730019",
    profile_picture: 
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ban: false
  }
}

]

