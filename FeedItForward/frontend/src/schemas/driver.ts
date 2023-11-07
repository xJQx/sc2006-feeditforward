import { UserCreate, UserDisplay, UserUpdate } from "./user";

export interface Driver {
  driver_id: number;
  vehicle_number: string;
  licence_number: string;

  user_id: number;
  user: UserDisplay;
}

export interface DriverCreate extends UserCreate {
  vehicle_number: string;
  licence_number: string;
}

export interface DriverUpdate extends UserUpdate {
  driver_id: number;
  vehicle_number: string;
  licence_number: string;
}
