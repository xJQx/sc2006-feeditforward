from .user import User, UserCreate
from .food import HawkerFood
from .misc import Geometry
from .review import Review

class HawkerCreate(UserCreate):
    overall_rating: float
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
    is_registered: bool
    
    hawker_foods: list[HawkerFood]

class Hawker(User):
    hawker_id: int
    overall_rating: float
    business_name: str
    operating_hours: str
    food_type: str
    geometry: Geometry
    is_registered: bool

    hawker_foods: list[HawkerFood] = []
    reviews: list[Review] = []

    class Config:
        orm_mode = True
