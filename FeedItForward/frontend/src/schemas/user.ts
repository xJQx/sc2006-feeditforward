export const ROLES = ["Admin", "Consumer", "Hawker", "Driver"] as const;
export type Role = (typeof ROLES)[number];

export interface User {
  user_id: number;
  name: string;
  password: string;
  email: string;
  role: Role;
  contact_number: string;
  address: string;
  profile_picture: string;
  ban: boolean;
}

export interface UserDisplay {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  contact_number: string;
  address: string;
  profile_picture: string;
  ban: boolean;
}

export interface UserCreate {
  name: string;
  password: string;
  email: string;
  role: string;
  contact_number: string;
  address: string;
}

export interface UserUpdate {
  user_id: number;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  profile_picture?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
