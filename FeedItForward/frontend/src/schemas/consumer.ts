import { UserCreate, UserDisplay, UserUpdate } from "./user";

export interface Consumer {
  consumer_id: number;
  priority: boolean;

  user_id: number;
  user: UserDisplay;
}

export interface ConsumerCreate extends UserCreate {}

export interface ConsumerUpdate extends UserUpdate {
  consumer_id: number;
  priority?: boolean;
}
