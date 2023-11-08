import { Review } from "./review";
import { UserCreate, UserDisplay, UserUpdate } from "./user";
import { Geometry } from "./misc";

export interface Hawker {
  hawker_id: number;
  business_name: string;
  food_type: string;
  operating_hours: string;
  overall_rating: number;
  geometry: Geometry;
  is_registered: boolean;

  user_id: number;
  user: UserDisplay;
}

export interface HawkerCreate extends UserCreate {
  business_name: string;
  operating_hours: string;
  food_type: string;
  geometry: Geometry;
}

export interface HawkerUpdate extends UserUpdate {
  hawker_id: number;
  business_name: string;
  operating_hours: string;
  food_type: string;
  geometry: Geometry;
}
