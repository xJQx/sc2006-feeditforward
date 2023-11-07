import { UserCreate, UserDisplay, UserUpdate } from "./user";

export interface Admin {
  admin_id: number;

  user_id: number;
  user: UserDisplay;
}

export interface AdminCreate extends UserCreate {}

export interface AdminUpdate extends UserUpdate {
  admin_id: number;
}
