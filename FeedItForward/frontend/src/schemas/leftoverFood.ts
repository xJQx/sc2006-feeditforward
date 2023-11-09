import { Hawker } from "./hawker";

export interface LeftoverFood {
  leftover_food_id: number;

  available: boolean;
  name: string;
  unit_of_measurement: string;
  amount: number;
  photo: string;
  time_passed: string;

  hawker_id: number;
  hawker: Hawker;
}

export interface LeftoverFoodCreate {
  name: string;
  unit_of_measurement: string;
  amount: number;
  photo: string;
  time_passed: string;

  hawker_id: number;
}

export interface LeftoverFoodUpdate {
  leftover_food_id: number;

  available: boolean;
  name: string;
  unit_of_measurement: string;
  amount: number;
  photo: string;
  time_passed: string;
}
