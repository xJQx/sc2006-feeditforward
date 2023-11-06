export interface Review {
  review_id: string;
  user_id: string;
  description: string;
  rating: number;
  photos?: string[];

  flagged: boolean;
  flagged_reason?: string;
}
