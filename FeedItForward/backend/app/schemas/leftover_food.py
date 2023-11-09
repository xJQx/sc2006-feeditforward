from pydantic import BaseModel

from .hawker import Hawker

class LeftoverFoodBase(BaseModel):
    name: str
    unit_of_measurement: str
    amount: int
    photo: str
    time_passed: str

class LeftoverFood(LeftoverFoodBase):
    leftover_food_id: int
    available: bool

    hawker_id: int
    hawker: Hawker

class LeftoverFoodCreate(LeftoverFoodBase):
    hawker_id: int

class LeftoverFoodUpdate(LeftoverFoodBase):
    leftover_food_id: int
    available: bool
