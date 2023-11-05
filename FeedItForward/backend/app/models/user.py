from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Mapped

from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    contact_number = Column(String)
    address = Column(String)
    profile_picture = Column(String)
    role = Column(String)

    # css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship("CustomerServiceSupportHistory", back_populates="user")
