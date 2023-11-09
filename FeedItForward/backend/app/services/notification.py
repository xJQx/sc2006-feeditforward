from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime

import schemas.notification as notification_schemas
from models.notification import Notification
from models.admin import Admin
from models.user import User

def get_notification_by_notification_id(db: Session, notification_id: int):
    db_notification = db.query(Notification).filter(Notification.notification_id == notification_id).first()
    
    return db_notification

def get_notifications_by_admin_id(db: Session, admin_id: int):
    db_notifications = db.query(Notification).filter(Notification.admin_id == admin_id)

    return db_notifications

def get_notifications_by_receiver_user_id(db: Session, receiver_user_id: int):
    db_notifications = db.query(Notification).filter(Notification.receiver_user_id == receiver_user_id)

    return db_notifications

def get_all_notifications(db: Session, skip: int = 0, limit: int = 100):
    db_notifications = db.query(Notification).offset(skip).limit(limit).all()

    return db_notifications

def create_notification(db: Session, notification: notification_schemas.NotificationCreate):
    db_admin = db.query(Admin).filter(Admin.admin_id == notification.admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=400, detail="Invalid admin_id")
    
    db_user = db.query(User).filter(User.user_id == notification.receiver_user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid receiver_user_id")

    db_notification = Notification(
        title=notification.title,
        description=notification.description,
        date_created=datetime.now(),

        admin_id=notification.admin_id,
        receiver_user_id=notification.receiver_user_id,
    )
    
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)

    return db_notification
