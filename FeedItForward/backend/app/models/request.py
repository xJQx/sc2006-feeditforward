from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base

class FoodRequest(Base):
    __tablename__ = "food_requests"

    food_request_id = Column(Integer, primary_key=True, index=True)
    consumer_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    available_food_id = Column(Integer, ForeignKey('available_foods.available_food_id'))
    driver_id = Column(Integer, ForeignKey('drivers.driver_id'))
    fulfilled = Column(Boolean)

    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="food_request")
    available_food: Mapped["AvailableFood"] = relationship("AvailableFood", back_populates="food_request")
    driver: Mapped["Driver"] = relationship("Driver", back_populates="food_request")

class PriorityStatusEnum(Enum):
    pending = "pending"
    review = "review"
    approved = "approved"

class PriorityRequest(Base):
    __tablename__ = "priority_requests"

    priority_request_id = Column(Integer, primary_key=True, index=True)
    consumer_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    status = Column(Enum(PriorityStatusEnum))
    document = Column(String)

    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="priority_request")
