import { Consumer } from "./consumer";

export const PRIORITY_REQUEST_ACTION = [
  "Approve",
  "Request",
  "Reject",
  "Cancel"
] as const;
export type PriorityRequestActionEnum =
  (typeof PRIORITY_REQUEST_ACTION)[number];

export const PRIORITY_REQUEST_STATUS = [
  "Pending",
  "Approved",
  "Rejected"
] as const;
export type PriorityRequestStatusEnum =
  (typeof PRIORITY_REQUEST_STATUS)[number];

export const PRIORITY_REQUEST_HOUSE_CATEGORY = [
  "3 Room",
  "4 Room",
  "5 Room",
  "Executive Condo",
  "Condo",
  "Landed",
  "PentHouse",
  "Others"
] as const;
export type PriorityRequestHouseCategory =
  (typeof PRIORITY_REQUEST_HOUSE_CATEGORY)[number];

export interface PriorityRequest {
  priority_request_id: number;

  household_income: string;
  number_of_residents: number;
  occupation: string;
  house_category: PriorityRequestHouseCategory;
  status: PriorityRequestStatusEnum;

  date_created: string;
  date_updated: string;

  consumer_id: number;
  consumer: Consumer;
}

export interface PriorityRequestCreate {
  household_income: string;
  number_of_residents: number;
  occupation: string;
  house_category: PriorityRequestHouseCategory;

  consumer_id: number;
}

export interface PriorityRequestUpdate {
  priority_request_id: number;

  household_income: string;
  number_of_residents: number;
  occupation: string;
  house_category: PriorityRequestHouseCategory;
  status: PriorityRequestStatusEnum;
}
