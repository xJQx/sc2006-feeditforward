import React, { useEffect, useState } from "react";
import { ScreenTitle } from "../../components";
import { Role } from "../../schemas/user";
import { Notification as NotificationDisplay } from "../../schemas/notification";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";

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
