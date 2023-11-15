import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ButtonBackNavigation } from "../../components";
import { useParams } from "react-router-dom";
import { CustomerServiceSupportHistory } from "../../schemas/customerServiceSupportHistory";
import { CSSMessage } from "../../schemas/cssMessage";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useGetServerImage } from "../../hooks";

// TODO: Add Websocket connection
// havent add  websocket connection

export const CustomerServiceSupportSingleChatScreen = () => {
  const { css_history_id } = useParams();
  const fetch = useFetch();

  const [selectedChat, setSelectedChat] =
    useState<CustomerServiceSupportHistory>();
  const [chatMessages, setChatMessages] = useState<CSSMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  // Fetch chat history + chat messages data
  useEffect(() => {
    const getChatHistoryData = async () => {
      const chatHistoryData = await fetch.get(
        `/customer-service-support/css-history/${css_history_id}`
      );
      setSelectedChat(chatHistoryData);
    };
    const getChatMessagesData = async () => {
      const chatMessagesData = await fetch.get(
        `/customer-service-support-controller/get-chat-messages/${css_history_id}`
      );
      setChatMessages(chatMessagesData);
    };

    getChatHistoryData();
    getChatMessagesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    setInputMessage("");
  };

  // Web socket
  // useEffect(() => {
  //   // Fetch from backend, using mock data for noww
  //   const fetchData = async () => {
  //     try {
  //       // Simulating delay
  //       await new Promise(resolve => setTimeout(resolve, 1000));

  //       // setSelectedChat();
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [css_history_id]);

  return (
    <div className="flex flex-col py-4 h-full">
      <div className="absolute left-0 top-0 bg-brand-light w-[100vw] h-full -z-10" />
      {/* Header */}
      <div className="flex">
        <div>
          <ButtonBackNavigation />
        </div>
        {selectedChat && (
          <div className="flex items-center justify-between w-full ml-6">
            <div className="text-[24px] font-bold text-left">
              {selectedChat.admin.user.name}
            </div>

            {/* Icons */}
            <div className="flex gap-2">
              <LuPhone
                className="text-[24px]"
                onClick={() => toast("💡 Coming soon...")}
              />
              <BsThreeDotsVertical
                className="text-[24px]"
                onClick={() => toast("💡 Coming soon...")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chat message */}
      <div className="flex-grow my-4 overflow-y-scroll">
        {selectedChat && <ChatMessages selectedChat={selectedChat} />}
      </div>

      {/* Input */}
      <div className="flex justify-between items-center gap-4 py-3 px-4 border border-brand-tertiary-active rounded-xl">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="!text-brand-tertiary-active bg-transparent outline-none w-full placeholder-brand-tertiary-active"
        />
        <IoSend
          className="text-brand-tertiary-active w-6 h-6"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

interface ChatMessagesProps {
  selectedChat: CustomerServiceSupportHistory;
}

const ChatMessages = (props: ChatMessagesProps) => {
  const { selectedChat } = props;
  const adminProfilePictureUrl = useGetServerImage(
    selectedChat.admin.user.profile_picture
  );

  return (
    <>
      {selectedChat.messages && (
        <div className="">
          {selectedChat.messages.map(message => (
            <div
              key={message.css_message_id}
              style={{
                display: "flex",
                justifyContent:
                  message.sender_user_id === selectedChat.admin.user_id
                    ? "flex-start"
                    : "flex-end"
              }}
            >
              {/* Admin Profile Picture */}
              {message.sender_user_id === selectedChat.admin.user.user_id && (
                <img
                  src={adminProfilePictureUrl}
                  alt={selectedChat.admin.user.name}
                  className="w-10 h-10 rounded-lg object-cover object-center m-[5px]"
                />
              )}

              {/* Text Message */}
              <div
                className="py-2 px-3 rounded-lg mx-[5px] mt-[5px] mb-[12px] max-w-[70%]"
                style={{
                  backgroundColor:
                    message.sender_user_id === selectedChat.admin.user.user_id
                      ? "#EBECF0"
                      : "#BAE8E8",
                  color:
                    message.sender_user_id === selectedChat.admin.user.user_id
                      ? "#000000"
                      : "black",
                  wordWrap: "break-word"
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
