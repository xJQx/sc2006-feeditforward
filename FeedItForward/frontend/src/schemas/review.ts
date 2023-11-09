import { Consumer } from "./consumer";
import { Hawker } from "./hawker";

export const REVIEW_ACTION = ["Delete", "Ignore", "Cancel"] as const;
export type ReviewActionEnum = (typeof REVIEW_ACTION)[number];

export interface Review {
  review_id: number;

  description: string;
  rating: number;
  photos?: string[];
  flagged: boolean;
  flagged_reason?: string;

  consumer_id: number;
  consumer: Consumer;

  hawker_id: number;
  hawker: Hawker;
}

export interface ReviewCreate {
  description: string;
  rating: number;
  photos: string[];
}

export interface ReviewUpdate {
  review_id: number;

  description: string;
  rating: number;
  photos: string[];
  flagged: boolean;
  flagged_reason: string;

  consumer_id: number;
}
