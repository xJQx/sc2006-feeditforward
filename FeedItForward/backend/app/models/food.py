from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
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

    hawker: Mapped["Hawker"] = relationship(back_populates="hawker_foods")
    food: Mapped["Food"] = relationship(back_populates="hawker_foods")
    availability: Mapped["HawkerFood"] = relationship(back_populates="hawker_food")

class AvailableFood(Base):
    __tablename__ = "available_foods"

    available_food_id = Column(Integer, primary_key=True, index=True)
    hawker_food_id = Column(Integer, ForeignKey('hawker_foods.hawker_food_id'))
    quantity = Column(Integer)

    hawker_food: Mapped["HawkerFood"] = relationship(back_populates="availability")
    food_requests: Mapped[list["FoodRequest"]] = relationship(back_populates="availability")


class FoodRequest(Base):
    __tablename__ = "food_requests"

    food_request_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'))
    available_food_id = Column(Integer, ForeignKey('available_foods.available_food_id'))
    driver_id = Column(Integer, ForeignKey('drivers.driver_id'))
    fulfilled = Column(Boolean)

    customer: Mapped["Customer"] = relationship(back_populates="food_request")
    available_food: Mapped["AvailableFood"] = relationship(back_populates="food_request")
    driver: Mapped["Driver"] = relationship(back_populates="food_request")

