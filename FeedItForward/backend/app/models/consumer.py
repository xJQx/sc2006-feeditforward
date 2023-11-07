from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User

class Consumer(Base):
    __tablename__ = 'consumers'

    consumer_id = Column(Integer, primary_key=True, index=True)
    priority = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    user: Mapped["User"] = relationship("User", back_populates="consumer")

    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="consumer")
    # food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="consumer")
    # priority_request: Mapped["PriorityRequest"] = relationship("PriorityRequest", back_populates="consumer")
