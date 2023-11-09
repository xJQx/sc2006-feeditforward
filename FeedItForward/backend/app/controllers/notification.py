from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.notification as notification_services
import schemas.notification as notification_schemas

class NotificationController:
    # ----- Notification ----- #
    def getNotificationByNotificationId(db: Session, notification_id: int):
        notification = notification_services.get_notification_by_notification_id(db, notification_id=notification_id)
        if notification is None:
            raise HTTPException(status_code=404, detail="Notification not found")
        return notification

    def getNotificationsByAdminId(db: Session, admin_id: int):
        notifications = notification_services.get_notifications_by_admin_id(db, admin_id=admin_id)
        if notifications is None:
            raise HTTPException(status_code=404, detail="No notifications found for queried admin id")
        return notifications
    
    def getNotificationsByReceiverUserId(db: Session, receiver_user_id: int):
        notifications = notification_services.get_notifications_by_receiver_user_id(db, receiver_user_id=receiver_user_id)
        if notifications is None:
            raise HTTPException(status_code=404, detail="No notifications found for queried user id")
        return notifications

    def getAllNotifications(db: Session, skip: int, limit: int):
        notifications = notification_services.get_all_notifications(db, skip=skip, limit=limit)
        return notifications

    def createNotification(db: Session, notification: notification_schemas.NotificationCreate):
        notification = notification_services.create_notification(db, notification);
        if notification is None:
            raise HTTPException(status_code=400, detail="Notification cannot be created")
        return notification
