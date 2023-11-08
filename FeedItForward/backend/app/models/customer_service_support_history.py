from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class CustomerServiceSupportHistory(Base):
    __tablename__ = "customer_service_support_histories"

    css_history_id = Column(Integer, primary_key=True, index=True)

    messages: Mapped[list["CSSMessage"]] = relationship("CSSMessage", back_populates="css_history")

    admin_id = Column(Integer, ForeignKey('admins.admin_id'))
    admin: Mapped["Admin"] = relationship("Admin", back_populates="css_history")

    user_id = Column(Integer, ForeignKey('users.user_id'))
    user: Mapped["User"] = relationship("User", back_populates="css_history")
