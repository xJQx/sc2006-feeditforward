/* This file contains schemas of all data models */
export interface SampleSchema {
  id: string;
  name: string;
  age: number;
}

export interface User {
  name: string;
  password: string;
  role: Role;
  // TODO...
}

export interface UserDisplay {
  userId: string;
  name: string;
  role: Role;
  img: {
    src: string;
    alt: string;
  };
  // TODO...
  // address
}

export type Role = "Admin" | "Consumer" | "Hawker" | "Driver";

export interface Review {
  reviewId: string;
  userId: string;
  description: string;
  approved: boolean;
}
