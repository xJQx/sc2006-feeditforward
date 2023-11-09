from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base

class Notification(Base):
    __tablename__ = "notifications"

    notification_id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    description = Column(String)
    
    date_created = Column(String)

    admin_id = Column(Integer, ForeignKey('admins.admin_id'))
    admin: Mapped["Admin"] = relationship("Admin", back_populates="notifications")

    receiver_user_id = Column(Integer, ForeignKey('users.user_id'))
    receiver: Mapped["User"] = relationship("User", back_populates="notifications")
