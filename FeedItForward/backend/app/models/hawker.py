from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base
from .user import User

class Hawker(Base):
    __tablename__ = 'hawkers'

    hawker_id = Column(Integer, primary_key=True, index=True)
    overall_rating = Column(Float)
    business_name= Column(String)
    operating_hours= Column(String)
    food_type= Column(String)
    geometry= Column(String)
    is_registered= Column(Boolean)

    user_id = Column(Integer, ForeignKey("users.user_id"))
    user: Mapped["User"] = relationship("User", back_populates="hawker")

    leftover_foods: Mapped[list["LeftoverFood"]] = relationship("LeftoverFood", back_populates="hawker")
    # reviews: Mapped[list["Review"]] = relationship("Review", back_populates="hawker")
