import { Review } from "./review";
import { UserDisplay } from "./user";
import { Geometry } from "./misc";

export interface Hawker extends UserDisplay {
  hawker_id: string;
  business_name: string;
  food_type: string;
  operating_hours: string;
  overall_rating: number;
  geometry: Geometry;
  is_registered: boolean;

  // hawker_foods: HawkerFood[];
  reviews?: Review[];
}
