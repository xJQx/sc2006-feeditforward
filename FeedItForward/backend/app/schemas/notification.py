from pydantic import BaseModel

from .admin import Admin

class Notification(BaseModel):
    notification_id: int

    title: str
    description: str

    date_created: str

    admin_id: int
    admin: Admin

    receiver_user_id: int
    # receiver: User # hidden as it may contain Hawker with geometry json data

class NotificationCreate(BaseModel):
    title: str
    description: str

    admin_id: int
    receiver_user_id: int
