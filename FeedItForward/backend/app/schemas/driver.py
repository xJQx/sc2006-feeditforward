from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role

class Driver(BaseModel):
    driver_id: int
    vehicle_number: str
    licence_number: str

    user_id: int
    user: User

    class Config:
        orm_mode = True

class DriverCreate(UserCreate):
    role: Role = Role.DRIVER
    vehicle_number: str
    licence_number: str

class DriverUpdate(UserUpdate):
    driver_id: int
    vehicle_number: str
    licence_number: str
