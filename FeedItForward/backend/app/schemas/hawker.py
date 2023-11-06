from pydantic import BaseModel
from typing import Optional

from .user import User, UserCreate, UserUpdate, Role
from .food import HawkerFood
from .misc import Geometry
from .review import Review

class Hawker(BaseModel):
    hawker_id: int
    overall_rating: float
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
    is_registered: bool

    user_id: int
    user: User

    # hawker_foods: list[HawkerFood] = []
    # reviews: list[Review] = []

    class Config:
        orm_mode = True

class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
    
    # hawker_foods: list[HawkerFood]

class HawkerUpdate(UserUpdate):
    hawker_id: int
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
    
    # hawker_foods: list[HawkerFood]
