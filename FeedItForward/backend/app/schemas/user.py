from pydantic import BaseModel
from typing import Optional
from enum import Enum

from .customer_service_support import CustomerServiceSupportHistory

class Role(Enum):
    ADMIM = "Admin"
    CONSUMER = "Consumer"
    HAWKER = "Hawker"
    DRIVER = "Driver"

class UserBase(BaseModel):
    name: str
    email: str
    contact_number: str
    address: str

class User(UserBase):
    user_id: int
    profile_picture: Optional[str] = ""
    role: Role

    css_history: 'list[CustomerServiceSupportHistory]' = []

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str
    role: Role

class UserUpdate(UserBase):
    user_id: int
    profile_picture: Optional[str] = ""

class UserLogin(BaseModel):
    email: str
    password: str
