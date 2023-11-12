import React, { useEffect, useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormSelect,
  ScreenTitle
} from "../../components";
import { Role, User } from "../../schemas/user";
import { Notification as NotificationDisplay } from "../../schemas/notification";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import { MdOutlineNotifications } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { ModalCloseButton } from "../../components/Modal";
import toast from "react-hot-toast";

export const NotificationScreen = () => {
  const fetch = useFetch();
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<NotificationDisplay[]>([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      const notificationsData: NotificationDisplay[] = await fetch.get(
        `/user-controller/get-all-notifications/${user?.user_id}`
      );
      // Sort the notifications by descending order, with the most recent notification at the first index
      notificationsData.sort((a, b) => {
        if (a.notification_id < b.notification_id) return 1;
        else if (a.notification_id > b.notification_id) return -1;
        return 0;
      });
      setNotifications(notificationsData);
    };
    fetchUserNotifications();
  }, []);

  return (
    <div>
      <ScreenTitle title="Notifications" />

      {/* Send Notification (Feature only for admin) */}
      {user?.role === "Admin" && <AdminSendNotification />}

      {/* Notifications */}
      <div className="flex flex-col gap-4 my-4">
        {notifications.map(notification => (
          <NotificationScreenCard
            key={notification.title + notification.date_created}
            title={notification.title}
            description={notification.description}
            date={notification.date_created}
            author={notification.admin.user.name}
            authorRole={notification.admin.user.role}
          />
        ))}
      </div>
      <div className="flex justify-center my-8 animate-pulse">
        🔔 You have no more notifications...
      </div>
    </div>
  );
};

interface NotificationScreenCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: Role;
}

const NotificationScreenCard = (props: NotificationScreenCardProps) => {
  const { title, description, date, author, authorRole } = props;

  return (
    <div className="bg-brand-light rounded-lg shadow-md py-3 px-4">
      <div className="text-[18px] font-bold">{title}</div>
      <div className="text-[14px]">{description}</div>
      <div className="text-[12px] italic mt-2">
        <div className="">Date: {new Date(date).toLocaleDateString()}</div>
        <div className="">
          By: {author} ({authorRole})
        </div>
      </div>
    </div>
  );
};

const AdminSendNotification = () => {
  const { user } = useAuthContext();
  const fetch = useFetch();

  const [usersIds, setUsersIds] = useState<number[]>([]);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const getUsersIdsData = async () => {
      const usersData: User[] = await fetch.get(
        "/user-controller/get-all-users"
      );
      const userIdsData = usersData
        .filter(user => user.role !== "Admin")
        .map(user => user.user_id);

      setUsersIds(userIdsData);
      setUserId(userIdsData[0]);
    };
    getUsersIdsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendNotification = async () => {
    if (!title || !description || userId <= 0) {
      return toast.error("Please input all fields!");
    }

    try {
      const response = await fetch.post("/admin-controller/notify-user", {
        title: title,
        description: description,
        admin_id: user?.user_id,
        receiver_user_id: userId
      });
      if (response) {
        toast.success("Notification sent.");
        setIsSendModalOpen(false);
        setTitle("");
        setDescription("");
        setUserId(usersIds[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* Button */}
      <div
        className="flex items-center gap-[2px] bg-brand-light w-max px-2 py-1 rounded text-[14px] my-2"
        onClick={() => {
          setIsSendModalOpen(true);
        }}
      >
        <FaPlus className="w-[12px] h-[12px]" />
        <span>Send Notification</span>
        <MdOutlineNotifications />
      </div>

      {/* Modal for inputs */}
      {isSendModalOpen && (
        <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-brand-light shadow-xl drop-shadow-xl rounded px-3 py-2">
          <div className="flex justify-center items-center gap-[2px] font-bold text-[18px] mt-1 mb-4">
            Send Notfication
            <MdOutlineNotifications />
          </div>

          <ModalCloseButton setIsModalOpen={setIsSendModalOpen} />

          {/* Inputs */}
          <FormContainer onFormSubmit={handleSendNotification}>
            <div className="flex flex-col gap-2">
              <FormInput
                type="text"
                label="Title"
                placeholder="Enter title"
                value={title}
                setValue={setTitle}
              />
              <FormInput
                type="text"
                label="Description"
                placeholder="Enter description"
                value={description}
                setValue={setDescription}
              />
              <FormSelect
                label="Receiver User ID"
                value={userId}
                setValue={setUserId}
                optionsList={usersIds}
                placeholder="Select user to send notification"
              />
              <div className="flex flex-row gap-2 mt-2">
                <button
                  className="w-full border border-gray-400 rounded-md text-gray-400 font-bold text-[18px] py-3"
                  onClick={() => setIsSendModalOpen(false)}
                >
                  Cancel
                </button>
                <FormButton label="Confirm" />
              </div>
            </div>
          </FormContainer>
        </div>
      )}
    </>
  );
};
