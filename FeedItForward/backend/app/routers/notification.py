from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.notification import NotificationController
import schemas.notification as notification_schemas

router = APIRouter()

@router.get("/notifications", response_model=list[notification_schemas.Notification])
def get_all_notifications(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return NotificationController.getAllNotifications(db, skip, limit)

@router.get('/notification/{notification_id}', response_model=notification_schemas.Notification)
async def get_notification_by_notification_id(notification_id: str, db: Session = Depends(get_db)):
    return NotificationController.getNotificationByNotificationId(db, notification_id)

@router.get('/notifications/adminid/{admin_id}', response_model=list[notification_schemas.Notification])
async def get_notifications_by_admin_id(admin_id: str, db: Session = Depends(get_db)):
    return NotificationController.getNotificationsByAdminId(db, admin_id)

@router.get('/notifications/receiver-userid/{receiver_user_id}', response_model=list[notification_schemas.Notification])
async def get_notifications_by_receiver_user_id(receiver_user_id: str, db: Session = Depends(get_db)):
    return NotificationController.getNotificationsByReceiverUserId(db, receiver_user_id)

@router.post("/notifications/new", response_model=notification_schemas.Notification)
def create_notification(notification: notification_schemas.NotificationCreate, db: Session = Depends(get_db)):
    return NotificationController.createNotification(db, notification)
