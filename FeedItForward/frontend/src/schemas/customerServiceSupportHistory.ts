import { Admin } from "./admin";
import { CSSMessage } from "./cssMessage";

export interface CustomerServiceSupportHistory {
  css_history_id: number;

  messages?: CSSMessage[];

  admin_id: number;
  admin: Admin;

  user_id: number;
}

export interface CustomerServiceSupportHistoryCreate {
  admin_id: number;
  user_id: number;
}
