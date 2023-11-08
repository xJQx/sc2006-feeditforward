export interface CSSMessage {
  css_message_id: number;

  text: string;
  sender_user_id: number;
  receiver_user_id: number;
  datetime: string;

  css_history_id: number;
}

export interface CSSMessageCreate {
  text: string;
  sender_user_id: number;
  receiver_user_id: number;

  css_history_id: number;
}
