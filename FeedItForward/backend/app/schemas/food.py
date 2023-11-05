from pydantic import BaseModel

class FoodBase(BaseModel):
    food_id: int
    description: str
    image: str

class HawkerFood(FoodBase):
    hawker_id: int
    location: str
    available: float

class LeftoverFood(HawkerFood):
    leftover_food_id: int
    quantity: float
    time_passed: str
