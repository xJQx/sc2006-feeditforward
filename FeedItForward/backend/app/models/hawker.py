from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey

from .user import User

class Hawker(User):
    __tablename__ = "hawkers"

    hawker_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    overall_rating = Column(Float)
    business_name= Column(String)
    operating_hours= Column(String)
    food_type= Column(String)
    geometry= Column(String)
    is_registered= Column(Boolean)

    # hawker_foods: Mapped[list["HawkerFood"]] = relationship("HawkerFood", back_populates="hawker")
    # reviews: Mapped[list["Review"]] = relationship("Review", back_populates="hawker")
