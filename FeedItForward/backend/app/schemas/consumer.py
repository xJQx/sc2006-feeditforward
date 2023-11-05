from .user import User, UserCreate
from .review import Review
from .request import FoodRequest, PriorityRequest

class ConsumerCreate(UserCreate):
    priority: bool = False

class Consumer(User):
    consumerId: int
    priority: bool = False

    food_requests: list[FoodRequest] = []
    reviews: list[Review] = []
    priority_request: list[PriorityRequest] = []

    class Config:
        orm_mode = True