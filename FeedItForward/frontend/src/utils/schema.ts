/* This file contains schemas of all data models */
export interface User {
  userId: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  contactNumber: string;
  address: string;
  img: {
    src: string;
    alt: string;
  };
}

export interface UserDisplay {
  userId: string;
  name: string;
  email: string;
  role: Role;
  contactNumber: string;
  address: string;
  img: {
    src: string;
    alt: string;
  };
}

export const ROLES = ["Admin", "Consumer", "Hawker", "Driver"] as const;
export type Role = (typeof ROLES)[number];

export interface Review {
  reviewId: string;
  userId: string;
  description: string;
  rating: number;
  photos?: string[];

  flagged: boolean;
  flaggedReason?: string;
}

interface Geometry {
  type: "Point";
  latitude: number;
  longitude: number;
}

export interface Hawker extends UserDisplay {
  hawkerId: string;
  businessName: string;
  foodType: string;
  operatingHours: string;
  overallRating: number;
  reviews?: Review[];
  geometry: Geometry;
  isRegistered: boolean;
}
