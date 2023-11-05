from sqlalchemy import Column, Integer, String, ForeignKey

from .user import User

class Driver(User):
    __tablename__ = "drivers"

    driver_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    vehicle = Column(String)

    # food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="driver")
