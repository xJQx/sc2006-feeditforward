from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User

class Admin(Base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    user: Mapped["User"] = relationship("User", back_populates="admin")

    notifications: Mapped["Notification"] = relationship("Notification", back_populates="admin")

    # css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship("CustomerServiceSupportHistory", back_populates="admin")
