from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class CSSMessage(Base):
    __tablename__ = "css_messages"

    css_message_id = Column(Integer, primary_key=True, index=True)

    text = Column(String)
    sender_user_id = Column(Integer)
    receiver_user_id = Column(Integer)
    datetime = Column(String)

    css_history_id = Column(Integer, ForeignKey('customer_service_support_histories.css_history_id'))
    css_history: Mapped["CustomerServiceSupportHistory"] = relationship("CustomerServiceSupportHistory", back_populates="messages")
