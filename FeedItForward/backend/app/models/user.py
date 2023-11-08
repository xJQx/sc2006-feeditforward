from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from schemas.user import Role

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    contact_number = Column(String)
    address = Column(String)
    profile_picture = Column(String)
    role = Column(Enum(Role))

    admin: Mapped["Admin"] = relationship("Admin", back_populates="user")
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="user")
    driver: Mapped["Driver"] = relationship("Driver", back_populates="user")
    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="user")
    
    notifications: Mapped["Notification"] = relationship("Notification", back_populates="receiver")
    css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship("CustomerServiceSupportHistory", back_populates="user")
