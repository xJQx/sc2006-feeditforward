import { ScreenTitle, ScreenSubTitle } from "../../components";
import { SearchBar } from "../../components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSMessage } from "../../schemas/cssMessage";
import { CustomerServiceSupportHistory } from "../../schemas/customerServiceSupportHistory";
import { BiSearchAlt } from "react-icons/bi";
import { Admin } from "../../schemas/admin";
import useFetch from "../../hooks/useFetch";
import { useGetServerImage } from "../../hooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../schemas/user";

export const CustomerServiceSupportScreen = () => {
  const { user } = useAuthContext();
  const fetch = useFetch();

  const [chatHistories, setChatHistories] = useState<
    CustomerServiceSupportHistory[]
  >([]);
  const [chatFilteredHistories, setChatFilteredHistories] = useState<
    CustomerServiceSupportHistory[]
  >([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);

  // Fetch admin and chat history data + create Chats that does not exist
  useEffect(() => {
    const getDataForUser = async () => {
      // Chat History Data
      let chatHistoriesData: CustomerServiceSupportHistory[] = await fetch.get(
        "/customer-service-support-controller/get-all-chats"
      );
      chatHistoriesData = chatHistoriesData.filter(
        chat => chat.user_id === user?.user_id
      );

      // Admin Data
      const adminData: Admin[] = await fetch.get("/admins");

      // Create new chats for new admin-user pair
      for (let i = 0; i < adminData.length; i++) {
        const admin = adminData[i];
        if (!chatHistoriesData.find(chat => chat.admin_id === admin.admin_id)) {
          try {
            console.log(user?.user_id);
            const newChat = await fetch.post(
              "/customer-service-support-controller/start-new-chat",
              {
                admin_id: admin.admin_id,
                user_id: user?.user_id
              }
            );
            chatHistoriesData = [...chatHistoriesData, newChat];
          } catch (e) {
            console.log(e);
          }
        }
      }

      setAdmins(adminData);
      setChatHistories(chatHistoriesData);
      setChatFilteredHistories(chatHistoriesData);
    };
    const getDataForAdmin = async () => {
      // Chat History Data
      let chatHistoriesData: CustomerServiceSupportHistory[] = await fetch.get(
        "/customer-service-support-controller/get-all-chats"
      );
      chatHistoriesData = chatHistoriesData.filter(
        chat => chat.admin_id === user?.user_id
      );

      setChatHistories(chatHistoriesData);
      setChatFilteredHistories(chatHistoriesData);
    };

    try {
      if (user?.role === "Admin") {
        getDataForAdmin();
      } else {
        getDataForUser();
      }
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search Feature
  const handleSearch = (searchQuery: string) => {
    const filteredHistories = chatHistories.filter(history => {
      const adminNameMatches = history.admin.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const messageMatches = history.messages?.some(message =>
        message.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return adminNameMatches || messageMatches;
    });

    setChatFilteredHistories(filteredHistories);
  };
  const handleSearchClear = () => {
    setChatFilteredHistories(chatHistories);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      <ScreenTitle title="Message Support" />

      {/* Admin List */}
      {admins.length !== 0 && (
        <div className="mt-6">
          <ScreenSubTitle title="Admins" className="mb-2" />
          <AdminList admins={admins} />
        </div>
      )}

      {/* Past Conversions */}
      <div className="flex flex-col justify-center gap-2">
        {/* Seearch Chat Feature */}
        <div className="mb-2">
          <div className="flex justify-between items-end">
            <ScreenSubTitle title="Conversations" className="!text-[22px]" />
            <BiSearchAlt size="25px" onClick={toggleSearchBar} />
          </div>
          {showSearchBar && (
            <SearchBar
              searchItemPlaceholder="admins or messages"
              handleSearch={handleSearch}
              handleOnClear={handleSearchClear}
              className="mt-2 !text-[14px] !py-[6px]"
            />
          )}
        </div>

        {/* Chat History List */}
        {chatFilteredHistories && (
          <ChatList chatHistories={chatFilteredHistories} />
        )}
      </div>
    </div>
  );
};

interface AdminListProps {
  admins: Admin[];
}

const AdminList = (props: AdminListProps) => {
  const { admins } = props;

  return (
    <div className="pb-2 overflow-scroll">
      <div className="flex gap-3 w-max">
        {admins.map(admin => (
          <AdminListItem key={admin.admin_id} admin={admin} />
        ))}
      </div>
    </div>
  );
};

interface AdminListItemProps {
  admin: Admin;
}

const AdminListItem = (props: AdminListItemProps) => {
  const { admin } = props;
  const adminPhotoUrl = useGetServerImage(admin.user.profile_picture);

  return (
    <div className="relative">
      <img
        src={adminPhotoUrl}
        alt={admin.user.name}
        className="w-14 h-14 object-cover object-center rounded-xl"
      />
      <GreenDot size={4} />
    </div>
  );
};

interface ChatListProps {
  chatHistories: CustomerServiceSupportHistory[];
}

const ChatList = ({ chatHistories }: ChatListProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-h-[25rem] min-h-[22rem] overflow-y-auto">
      <ul className="list-none flex flex-col gap-3">
        {chatHistories.map(history => (
          <ChatHistoryItem
            key={history.css_history_id}
            history={history}
            onClick={() =>
              navigate(`/customer-service-support/${history.css_history_id}`)
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

const ChatHistoryItem = ({ history, onClick }: ChatHistoryItemProps) => {
  const lastMessage = history.messages?.[
    history.messages.length - 1
  ] as CSSMessage;
  const fetch = useFetch();
  const { user: loggedInUser } = useAuthContext();
  const [user, setUser] = useState<User>();

  // get User for Admins
  useEffect(() => {
    const getUser = async () => {
      const data = await fetch.get(`/user/${history.user_id}`);
      setUser(data);
    };
    if (loggedInUser?.role === "Admin") {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <li
      className="flex flex-row gap-2 items-center justify-start"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-4">
        {/* Image - For Admin -> Display User */}
        {loggedInUser?.role === "Admin" && user && (
          <ProfilePhotoSquare
            profilePicture={user.profile_picture}
            alt={user.name}
            size={20}
          />
        )}
        {/* Image - For User -> Display Admin */}
        {loggedInUser && loggedInUser?.role !== "Admin" && (
          <ProfilePhotoSquare
            profilePicture={history.admin.user.profile_picture}
            alt={history.admin.user.name}
            size={20}
          />
        )}

        {/* Name and text */}
        <div className="flex-grow">
          <div className="text-[20px] font-bold mb-2">
            {loggedInUser?.role === "Admin"
              ? user?.name
              : history.admin.user.name}
          </div>
          <div className="w-full text-[12px] text-gray-500">
            {lastMessage?.text ?? "Start chat..."}
          </div>
        </div>
      </div>
    </li>
  );
};

interface ProfilePhotoSquareProps {
  profilePicture: string;
  alt: string;
  size: number;
}

const ProfilePhotoSquare = (props: ProfilePhotoSquareProps) => {
  const { profilePicture, alt, size } = props;
  const photoUrl = useGetServerImage(profilePicture);

  return (
    <div className={`relative w-${size} h-${size}`}>
      <img
        src={photoUrl}
        alt={alt}
        className="w-full h-full object-cover object-center rounded-2xl"
      />
      <GreenDot size={5} />
    </div>
  );
};

interface GreenDotProps {
  size: number;
}

const GreenDot = ({ size }: GreenDotProps) => {
  return (
    <div
      className={`absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-brand-primary rounded-full w-${size} h-${size}`}
    />
  );
};
