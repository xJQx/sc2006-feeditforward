from pydantic import BaseModel

from .customer_service_support import CustomerServiceSupportHistory

class UserBase(BaseModel):
    name: str
    email: str
    contact_number: str
    address: str
    profile_picture: str
    role: str

class User(UserBase):
    user_id: int

    css_history: 'list[CustomerServiceSupportHistory]' = []

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str
