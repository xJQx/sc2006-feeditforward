from sqlalchemy import Column, Integer, Boolean, ForeignKey

from .user import User

class Consumer(User):
    __tablename__ = "consumers"

    consumer_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    priority = Column(Boolean, default=False)

    # food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="consumer")
    # reviews: Mapped[list["Review"]] = relationship("Review", back_populates="consumer")
    # priority_request: Mapped["PriorityRequest"] = relationship("PriorityRequest", back_populates="consumer")
