from pydantic import BaseModel
from typing import Optional

from .user import User, UserCreate, UserUpdate, Role
from .misc import Geometry

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

    class Config:
        orm_mode = True

class HawkerCreate(UserCreate):
    role: Role = Role.HAWKER
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry

class HawkerUpdate(UserUpdate):
    hawker_id: int
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
