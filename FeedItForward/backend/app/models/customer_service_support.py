from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class CustomerServiceSupportHistory(Base):
    __tablename__ = "customer_service_support_histories"

    user_id = Column(Integer, ForeignKey('users.user_id'))
    admin_id = Column(Integer, ForeignKey('admins.admin_id'))
    text_history = Column(String)

    user: Mapped["User"] = relationship("User", back_populates="css_history")
    admin: Mapped["Admin"] = relationship("Admin", back_populates="css_history")
