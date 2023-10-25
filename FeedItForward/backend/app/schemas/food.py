from pydantic import BaseModel


class Food(BaseModel):
    food_id: int
    description: str
    image: str

class HawkerFood(BaseModel):
    hawker_food_id: int
    hawker_id: int
    food_id: int

class AvailableFood(BaseModel):
    available_food_id: int
    hawker_food_id: int
    quantity: int

class FoodRequest(BaseModel):
    food_request_id: int
    customer_id: int
    available_food_id: int
    driver_id: int
    fulfilled: bool
