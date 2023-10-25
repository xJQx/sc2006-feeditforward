from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped

from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'))
    text = Column(String)
    rating = Column(Integer)
    flagged = Column(Boolean)

    customer: Mapped["Customer"] = relationship(back_populates="reviews")

class PriorityStatusEnum(Enum):
    pending = "pending"
    review = "review"
    approved = "approved"

class PriorityRequest(Base):
    __tablename__ = "priority_requests"

    priority_request_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'))
    status = Column(Enum(PriorityStatusEnum))
    document = Column(String)

    customer: Mapped["Customer"] = relationship(back_populates="priority_request")

class CustomerServiceSupportHistory(Base):
    __tablename__ = "customer_service_support_histories"

    user_id = Column(Integer, ForeignKey('users.user_id'))
    admin_id = Column(Integer, ForeignKey('admins.admin_id'))
    text_history = Column(String)

    user: Mapped["User"] = relationship(back_populates="css_history")
    admin: Mapped["Admin"] = relationship(back_populates="css_history")
