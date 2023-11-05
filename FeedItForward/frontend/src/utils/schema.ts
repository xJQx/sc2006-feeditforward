/* This file contains schemas of all data models */
export interface User {
  user_id: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  contact_number: string;
  address: string;
  profile_picture: string;
}

export interface UserDisplay {
  user_id: string;
  name: string;
  email: string;
  role: Role;
  contact_number: string;
  address: string;
  profile_picture: string;
}

export const ROLES = ["Admin", "Consumer", "Hawker", "Driver"] as const;
export type Role = (typeof ROLES)[number];

export interface Review {
  review_id: string;
  user_id: string;
  description: string;
  rating: number;
  photos?: string[];

  flagged: boolean;
  flagged_reason?: string;
}

interface Geometry {
  type: "Point";
  latitude: number;
  longitude: number;
}

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
