from pydantic import BaseModel

from .food import FoodRequest, HawkerFood
from .misc import CustomerServiceSupportHistory, Review, PriorityRequest


class UserBase(BaseModel):
    name: str
    address: str
    singpass: bool

class User(UserBase):
    user_id: int
    username: str
    password: str

    css_history: 'list[CustomerServiceSupportHistory]' = []

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    username: str
    password: str

class Admin(User):
    admin_id: int

class Hawker(User):
    hawker_id: int
    overall_rating: float

    hawker_foods: list[HawkerFood] = []

class Driver(User):
    driver_id: int
    vehicle: str

    food_requests: list[FoodRequest] = []

    class Config:
        orm_mode = True

class Customer(User):
    customer_id: int
    priority: bool = False

    food_requests: list[FoodRequest] = []
    reviews: list[Review] = []
    priority_request: list[PriorityRequest] = []

    class Config:
        orm_mode = True
