from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User

class Driver(Base):
    __tablename__ = 'drivers'

    driver_id = Column(Integer, primary_key=True, index=True)
    vehicle_number = Column(String)
    licence_number = Column(String)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    user: Mapped["User"] = relationship("User", back_populates="driver")

    # food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="driver")
