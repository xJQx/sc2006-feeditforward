from pydantic import BaseModel
from typing import Optional

from .user import User, UserCreate, UserUpdate, Role
from .review import Review
from .request import FoodRequest, PriorityRequest

class Consumer(BaseModel):
    consumer_id: int
    priority: bool = False

    user_id: int
    user: User

    # food_requests: list[FoodRequest] = []
    # reviews: list[Review] = []
    # priority_request: list[PriorityRequest] = []

    class Config:
        orm_mode = True

class ConsumerCreate(UserCreate):
    role: Role = Role.CONSUMER

class ConsumerUpdate(UserUpdate):
    consumer_id: int
    priority: Optional[bool]