import { ScreenTitle, ScreenSubTitle } from "../../components";
import { SearchBar } from "../../components";
import { messagesData, historyWithMessages } from "../../data/messagesData";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSMessage } from "../../schemas/cssMessage";
import { CustomerServiceSupportHistory } from "../../schemas/customerServiceSupportHistory";
import { BiSearchAlt } from "react-icons/bi";

export const CustomerServiceSupportScreen = () => {
  const [chatHistories, setChatHistories] = useState<
    CustomerServiceSupportHistory[]
  >([historyWithMessages]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (searchKey: string) => {
    const filteredHistories = chatHistories.filter(history => {
      const adminNameMatches = history.admin.user.name
        .toLowerCase()
        .includes(searchKey.toLowerCase());

      const messageMatches = history.messages?.some(message =>
        message.text.toLowerCase().includes(searchKey.toLowerCase())
      );
      return adminNameMatches || messageMatches;
    });

    setChatHistories(filteredHistories);

    console.log(`Search for chat histories with searchKey: ${searchKey}`);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      <ScreenTitle title="Customer Service Support" />

      <div className="flex flex-col justify-center gap-5">
        <div className="flex justify-between items-end">
          <ScreenSubTitle title="Conversations" />
          <BiSearchAlt size="25px" onClick={toggleSearchBar} />
        </div>
        {showSearchBar && (
          <SearchBar
            searchItemPlaceholder="admins or messages"
            handleSearch={handleSearch}
          />
        )}
        <ChatList chatHistories={chatHistories} />
      </div>
    </div>
  );
};

interface ChatListProps {
  chatHistories: CustomerServiceSupportHistory[];
}

const ChatList: React.FC<ChatListProps> = ({ chatHistories }) => {
  const navigate = useNavigate();

  return (
    <div className="max-h-[25rem] min-h-[22rem] overflow-y-auto">
      <ul className="list-none">
        {chatHistories.map(history => (
          <ChatHistoryItem
            key={history.css_history_id}
            history={history}
            onClick={() =>
              navigate(
                `/customer-service-support/${history.messages?.[0]?.css_history_id}`
              )
            }
          />
        ))}
      </ul>
    </div>
  );
};

interface ChatHistoryItemProps {
  history: CustomerServiceSupportHistory;
  onClick: () => void;
}

const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  history,
  onClick
}) => {
  const lastMessage = history.messages?.[
    history.messages.length - 1
  ] as CSSMessage;

  return (
    <li
      className="flex flex-row gap-2 py-3 items-center justify-start"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="bg-gray-300 w-20 h-20 rounded-xl overflow-hidden">
          <img
            src={history.admin.user.profile_picture}
            alt={history.admin.user.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-grow">
          <div className="text-[20px] font-bold mb-2">
            {history.admin.user.name}
          </div>
          <div className="w-full text-[12px] text-gray-500">
            {lastMessage?.text}
          </div>
        </div>
      </div>
    </li>
  );
};
