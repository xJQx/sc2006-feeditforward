from pydantic import BaseModel

from .food import FoodRequest, HawkerFood
from .misc import CustomerServiceSupportHistory, Review, PriorityRequest, Geometry, Image


class UserBase(BaseModel):
    name: str
    email: str
    password: str
    contactNumber: str
    address: str
    img: Image

class User(UserBase):
    userId: int

    role: str
    css_history: 'list[CustomerServiceSupportHistory]' = []

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    username: str
    password: str

class Admin(User):
    adminId: int

class Hawker(User):
    hawkerId: int
    overallRating: float
    businessName: str
    operatingHours: str
    foodType: str
    geometry: Geometry
    isRegistered: bool

    hawkerFoods: list[HawkerFood] = []
    reviews: list[Review] = []

class Driver(User):
    driverId: int
    vehicle: str

    food_requests: list[FoodRequest] = []

    class Config:
        orm_mode = True

class Consumer(User):
    consumerId: int
    priority: bool = False

    foodRequests: list[FoodRequest] = []
    reviews: list[Review] = []
    priorityRequest: list[PriorityRequest] = []

    class Config:
        orm_mode = True
