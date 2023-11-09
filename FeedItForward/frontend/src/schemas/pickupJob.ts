import { Consumer } from "./consumer";
import { Driver } from "./driver";
import { LeftoverFood } from "./leftoverFood";
import { Geometry } from "./misc";

export const PICKUP_JOB_ACTION = ["Accept", "Ignore", "Complete"] as const;
export type PickupJobAction = (typeof PICKUP_JOB_ACTION)[number];

export const PICKUP_JOB_STATUS = [
  "Available",
  "In Progress",
  "Completed"
] as const;
export type PickupJobStatus = (typeof PICKUP_JOB_STATUS)[number];

export interface PickupJob {
  pickup_job_id: number;

  start_location: Geometry;
  end_location: Geometry;
  description: string;
  status: PickupJobStatus;
  photo_proofs: string[];

  leftover_food_id: number;
  leftover_food: LeftoverFood;

  consumer_id: number;
  consumer: Consumer;

  driver_id?: number;
  driver?: Driver;
}

export interface PickupJobCreate {
  start_location: Geometry;
  end_location: Geometry;
  description: string;
  status: PickupJobStatus;

  leftover_food_id: number;
  consumer_id: number;
}

export interface PickupJobUpdate {
  pickup_job_id: number;

  start_location: Geometry;
  end_location: Geometry;
  description: string;
  status: PickupJobStatus;
  photo_proofs: string[];

  driver_id: number;
}
