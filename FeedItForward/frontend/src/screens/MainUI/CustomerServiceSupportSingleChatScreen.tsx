import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { ButtonBackNavigation } from "../../components";
import { useParams } from "react-router-dom";
import { CustomerServiceSupportHistory } from "../../schemas/customerServiceSupportHistory";
import { CSSMessage, CSSMessageCreate } from "../../schemas/cssMessage";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useGetServerImage } from "../../hooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { User, UserDisplay } from "../../schemas/user";

export const CustomerServiceSupportSingleChatScreen = () => {
  const { css_history_id } = useParams();
  const { user } = useAuthContext();
  const fetch = useFetch();

  const bottomEl = useRef(null);

  const scrollToBottom = () => {
    (bottomEl.current as any).scrollIntoView({ behavior: "smooth" });
  };

  const [selectedChat, setSelectedChat] =
    useState<CustomerServiceSupportHistory>();
  const [chatMessages, setChatMessages] = useState<CSSMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [websckt, setWebsckt] = useState<WebSocket>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userIdIsTyping, setUserIdIsTyping] = useState<{
    senderUserId: number;
    receiverUserId: number;
  }>();
  const [clientId] = useState(Math.floor(new Date().getTime() / 1000));

  const parseWebsocketMessage = (e: MessageEvent<any>) => {
    const message = JSON.parse(e.data);

    if (message.type === "css_message") {
      const css_message = JSON.parse(message.css_message);
      setChatMessages(prev => [...prev, css_message]);
    } else if (message.type === "typing") {
      const isTyping = message.isTyping;
      const senderUserId = message.senderUserId;
      const receiverUserId = message.receiverUserId;
      setIsTyping(isTyping);
      setUserIdIsTyping({ senderUserId, receiverUserId });
    }
    scrollToBottom();
  };

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
      scrollToBottom();
    };

    getChatHistoryData();
    getChatMessagesData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Web socket
  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + clientId;
    const ws = new WebSocket(url);

    ws.onopen = event => {
      ws.send("Connect");
      console.log("Websocket connected");
    };

    // recieve message every start page
    ws.onmessage = e => {
      parseWebsocketMessage(e);
    };

    setWebsckt(ws);

    // clean up function when we close page
    return () => ws.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const sendMessageNewCSS = () => {
    if (inputMessage.length === 0 || !selectedChat || !user) return;
    if (!websckt) return toast.error("Failed to connect to the server.");

    const newCssMessage: CSSMessageCreate = {
      css_history_id: selectedChat.css_history_id,
      sender_user_id: user.user_id,
      receiver_user_id:
        user.role === "Admin" ? selectedChat.user_id : selectedChat.admin_id,
      text: inputMessage
    };

    const websocketReq = {
      type: "new_message",
      css_message: newCssMessage
    };

    websckt.send(JSON.stringify(websocketReq));
    // recieve message every send message
    websckt.onmessage = e => {
      parseWebsocketMessage(e);
    };
    setInputMessage("");

    // Send message to show that user stopped typing
    const websocketReq2 = {
      type: "typing",
      isTyping: false,
      senderUserId: 0,
      receiverUserId: 0
    };

    websckt.send(JSON.stringify(websocketReq2));
    // recieve message every send message
    websckt.onmessage = e => {
      parseWebsocketMessage(e);
    };

    window.scrollTo(0, document.body.scrollHeight);
  };
  const sendMessageTyping = (text: string) => {
    if (inputMessage.length === 0 || !selectedChat || !user) return;
    if (!websckt) return toast.error("Failed to connect to the server.");

    const receiverUserId =
      user.role === "Admin" ? selectedChat.user_id : selectedChat.admin_id;
    const websocketReq = {
      type: "typing",
      isTyping: text.length > 0,
      senderUserId: text.length > 0 ? user.user_id : 0,
      receiverUserId: text.length > 0 ? receiverUserId : 0
    };

    websckt.send(JSON.stringify(websocketReq));
    // recieve message every send message
    websckt.onmessage = e => {
      parseWebsocketMessage(e);
    };
  };

  return (
    <div className="flex flex-col py-4 h-full">
      <div className="absolute left-0 top-0 bg-brand-light w-[100vw] h-full -z-10" />
      {/* Header */}
      {selectedChat && <Header selectedChat={selectedChat} />}

      {/* Chat message */}
      <div className="flex-grow my-4 overflow-y-scroll">
        {selectedChat && (
          <ChatMessages
            selectedChat={selectedChat}
            chatMessages={chatMessages}
          />
        )}

        {/* Typing Animation */}
        {userIdIsTyping && selectedChat && (
          <TypingAnimation
            isTyping={isTyping}
            userIdIsTyping={userIdIsTyping}
            selectedChat={selectedChat}
          />
        )}

        {/* Ref Div for auto scroll to bottom */}
        <div ref={bottomEl}></div>
      </div>

      {/* Input */}
      <div className="flex justify-between items-center gap-4 py-3 px-4 border border-brand-tertiary-active rounded-xl">
        <input
          type="text"
          value={inputMessage}
          onChange={e => {
            setInputMessage(e.target.value);
            sendMessageTyping(e.target.value);
          }}
          placeholder="Type your message..."
          className="!text-brand-tertiary-active bg-transparent outline-none w-full placeholder-brand-tertiary-active"
        />
        <IoSend
          className="text-brand-tertiary-active w-6 h-6"
          onClick={sendMessageNewCSS}
        />
      </div>
    </div>
  );
};

interface HeaderProps {
  selectedChat: CustomerServiceSupportHistory;
}

const Header = (props: HeaderProps) => {
  const { selectedChat } = props;
  const { user: loggedInUser } = useAuthContext();
  const fetch = useFetch();

  const [user, setUser] = useState<UserDisplay>();

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetch.get(`/user/${selectedChat.user_id}`);
      setUser(data);
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  return (
    <div className="flex">
      <div>
        <ButtonBackNavigation />
      </div>
      <div className="flex items-center justify-between w-full ml-6">
        <div className="text-[24px] font-bold text-left">
          {loggedInUser?.user_id === selectedChat.admin_id
            ? user?.name
            : selectedChat.admin.user.name}
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
    </div>
  );
};

interface ChatMessagesProps {
  selectedChat: CustomerServiceSupportHistory;
  chatMessages: CSSMessage[];
}

const ChatMessages = (props: ChatMessagesProps) => {
  const { selectedChat, chatMessages } = props;
  const { user: loggedInUser } = useAuthContext();
  const fetch = useFetch();

  const [user, setUser] = useState<User>();

  // get User for Admins
  useEffect(() => {
    const getUser = async () => {
      const data = await fetch.get(`/user/${selectedChat.user_id}`);
      setUser(data);
    };
    if (loggedInUser?.role === "Admin") {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  return (
    <>
      {chatMessages && (
        <div id="chat-messages" className="">
          {chatMessages.map(message => (
            <div
              key={message.css_message_id}
              style={{
                display: "flex",
                justifyContent:
                  message.sender_user_id === loggedInUser?.user_id
                    ? "flex-end"
                    : "flex-start"
              }}
            >
              {/* Profile Picture */}
              {/* For Admin -> Show User */}
              {message.sender_user_id !== loggedInUser?.user_id &&
                loggedInUser?.role === "Admin" &&
                user && (
                  <ProfilePhotoSquare
                    profilePicture={user.profile_picture}
                    alt={user.name}
                  />
                )}
              {/* For User -> Show admin */}
              {message.sender_user_id !== loggedInUser?.user_id &&
                loggedInUser?.role !== "Admin" && (
                  <ProfilePhotoSquare
                    profilePicture={selectedChat.admin.user.profile_picture}
                    alt={selectedChat.admin.user.name}
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

interface ProfilePhotoSquareProps {
  profilePicture: string;
  alt: string;
}

const ProfilePhotoSquare = (props: ProfilePhotoSquareProps) => {
  const { profilePicture, alt } = props;
  const photoUrl = useGetServerImage(profilePicture);

  return (
    <>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={alt}
          className="w-10 h-10 rounded-lg object-cover object-center m-[5px]"
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-brand-tertiary" />
      )}
    </>
  );
};

interface TypingAnimationProps {
  isTyping: boolean;
  userIdIsTyping: {
    senderUserId: number;
    receiverUserId: number;
  };
  selectedChat: CustomerServiceSupportHistory;
}

const TypingAnimation = (props: TypingAnimationProps) => {
  const { isTyping, userIdIsTyping, selectedChat } = props;
  const { user: loggedInUser } = useAuthContext();
  const fetch = useFetch();

  const [userTyping, setUserTyping] = useState<UserDisplay>();
  const userTypingId =
    loggedInUser?.user_id === selectedChat.user_id
      ? selectedChat.admin_id
      : loggedInUser?.user_id === selectedChat.admin_id
      ? selectedChat.user_id
      : 0;

  useEffect(() => {
    const getUserData = async () => {
      if (userIdIsTyping.senderUserId <= 0) return;
      const data = await fetch.get(`/user/${userIdIsTyping.senderUserId}`);
      setUserTyping(data);
    };
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdIsTyping]);

  return (
    <>
      {isTyping &&
        userIdIsTyping.senderUserId === userTypingId &&
        userTyping && (
          <div className="flex items-center gap-[5px]">
            {userTyping && (
              <ProfilePhotoSquare
                profilePicture={userTyping.profile_picture}
                alt={userTyping.name}
              />
            )}
            <div className="flex items-center h-[20px]">
              <div className="text-brand-tertiary-active animate-pulse duration-1000 delay-[0] mr-1">
                Typing
              </div>
              <GoDotFill className="text-[14px] text-brand-tertiary-active animate-pulse delay-[75] duration-1000" />
              <GoDotFill className="text-[14px] text-brand-tertiary-active animate-pulse delay-[150] duration-1000" />
              <GoDotFill className="text-[14px] text-brand-tertiary-active animate-pulse delay-[225] duration-1000" />
            </div>
          </div>
        )}
    </>
  );
};
