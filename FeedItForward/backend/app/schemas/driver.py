from .user import User, UserCreate
from .request import FoodRequest

class DriverCreate(UserCreate):
    vehicle_number: str
    licence_number: str

class Driver(User):
    driver_id: int
    vehicle_number: str
    licence_number: str

    food_requests: list[FoodRequest] = []

    class Config:
        orm_mode = True
  