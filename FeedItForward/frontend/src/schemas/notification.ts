import { Admin } from "./admin";

export interface Notification {
  notification_id: number;

  title: string;
  description: string;

  date_created: string;

  admin_id: number;
  admin: Admin;

  receiver_user_id: number;
}

export interface NotificationCreate {
  title: string;
  description: string;

  admin_id: number;
  receiver_user_id: number;
}
