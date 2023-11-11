import { CSSMessage } from "../schemas/cssMessage"; // Update the path accordingly
import { CustomerServiceSupportHistory } from "../schemas/customerServiceSupportHistory";

export const messagesData: CSSMessage[] = [
  {
    css_message_id: 1,
    text: "Hello, how can I assist you?",
    sender_user_id: 5, 
    receiver_user_id: 1, 
    datetime: "2023-11-11T12:00:00Z",
    css_history_id: 1, 
  },
  {
    css_message_id: 2,
    text: "Hi, I have a question about my account.",
    sender_user_id: 1, 
    receiver_user_id: 5, 
    datetime: "2023-11-11T12:15:00Z",
    css_history_id: 1, 
  },

];


export const historyWithMessages: CustomerServiceSupportHistory = {
    css_history_id: 1,
    messages: [
      {
        css_message_id: 1,
        text: "Hello, how can I assist you?",
        sender_user_id: 5,
        receiver_user_id: 1,
        datetime: "2023-11-11T12:00:00Z",
        css_history_id: 1,
      },
      {
        css_message_id: 2,
        text: "Hi, I have a question about my account.",
        sender_user_id: 1, 
        receiver_user_id: 5, 
        datetime: "2023-11-11T12:15:00Z",
        css_history_id: 1, 
      },
    ],
    admin_id: 5,
    admin: {
        admin_id: 5,
        user_id: 5,
        user: {
          user_id: 5,
          name: "Agent Alex",
          role: "Admin",
          email: "alex@gmail.com",
          contact_number: "97367190",
          address: "Blk 403 Bedok North Avenue 3, #01-241, 460403",
          profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ban: false,
        },
      },
    user_id: 1,
  };
