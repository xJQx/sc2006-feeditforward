/* This file contains schemas of all data models */
export interface SampleSchema {
  id: string;
  name: string;
  age: number;
}

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
  approved: boolean;
}
