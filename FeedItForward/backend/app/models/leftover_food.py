from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class LeftoverFood(Base):
    __tablename__ = "leftover_foods"

    leftover_food_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    unit_of_measurement = Column(String)
    amount = Column(Integer)
    photo = Column(String)
    time_passed = Column(String)
    available = Column(Boolean)

    hawker_id = Column(Integer, ForeignKey('hawkers.hawker_id'))
    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="leftover_foods")

    pickup_jobs: Mapped[list["PickupJob"]] = relationship("PickupJob", back_populates="leftover_food")
    # food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="availability")
