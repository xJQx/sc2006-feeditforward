from pydantic import BaseModel
from typing import Optional

from .user import User, UserCreate, UserUpdate, Role

class Consumer(BaseModel):
    consumer_id: int
    priority: bool = False

    user_id: int
    user: User

    class Config:
        orm_mode = True

class ConsumerCreate(UserCreate):
    role: Role = Role.CONSUMER

class ConsumerUpdate(UserUpdate):
    consumer_id: int
    priority: Optional[bool]