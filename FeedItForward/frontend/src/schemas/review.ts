export interface Review {
  review_id: number;
  user_id: number;
  description: string;
  rating: number;
  photos?: string[];

  flagged: boolean;
  flagged_reason?: string;
}
