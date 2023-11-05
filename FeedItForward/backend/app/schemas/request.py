from pydantic import BaseModel
from typing import Literal

class FoodRequest(BaseModel):
    food_request_id: int
    fulfilled: bool

    leftover_food_id: int
    customer_id: int
    driver_id: int

class PriorityRequest(BaseModel):
    priority_request_id: int
    customer_id: int
    status: Literal["pending", "review", "approved"]
    document: str
