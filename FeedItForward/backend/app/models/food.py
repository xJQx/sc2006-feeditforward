from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class Food(Base):
    __tablename__ = "foods"

    food_id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    image = Column(String)

class HawkerFood(Base):
    __tablename__ = "hawker_foods"

    hawker_food_id = Column(Integer, primary_key=True, index=True)
    hawker_id = Column(Integer, ForeignKey('hawkers.hawker_id'))
    food_id = Column(Integer, ForeignKey('foods.food_id'))

    hawker: Mapped["Hawker"] = relationship("Hawker", back_populates="hawker_foods")
    food: Mapped["Food"] = relationship("Food", back_populates="hawker_foods")
    availability: Mapped["HawkerFood"] = relationship("HawkerFood", back_populates="hawker_food")

class LeftoverFood(Base):
    __tablename__ = "leftover_foods"

    leftover_food_id = Column(Integer, primary_key=True, index=True)
    hawker_food_id = Column(Integer, ForeignKey('hawker_foods.hawker_food_id'))
    quantity = Column(Integer)

    hawker_food: Mapped["HawkerFood"] = relationship("HawkerFood", back_populates="availability")
    food_requests: Mapped[list["FoodRequest"]] = relationship("FoodRequest", back_populates="availability")
    pickup_jobs: Mapped[list["PickupJob"]] = relationship("PickupJob", back_populates="food")
