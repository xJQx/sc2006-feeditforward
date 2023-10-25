from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship,Mapped

from app.database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    address = Column(String)
    singpass = Column(Boolean)

    css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship(back_populates="user")


class Hawker(User):
    __tablename__ = "hawkers"

    hawker_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    overall_rating = Column(Float)

    hawker_foods: Mapped[list["HawkerFood"]] = relationship(back_populates="hawker")

class Admin(User):
    __tablename__ = "admins"

    admin_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)

    css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship(back_populates="admin")

class Driver(User):
    __tablename__ = "drivers"

    driver_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    vehicle = Column(String)

    food_requests: Mapped[list["FoodRequest"]] = relationship(back_populates="driver")

class Customer(User):
    __tablename__ = "customers"

    customer_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    priority = Column(Boolean, default=False)

    food_requests: Mapped[list["FoodRequest"]] = relationship(back_populates="customer")
    reviews: Mapped[list["Review"]] = relationship(back_populates="customer")
    priority_request: Mapped["PriorityRequest"] = relationship(back_populates="customer")
