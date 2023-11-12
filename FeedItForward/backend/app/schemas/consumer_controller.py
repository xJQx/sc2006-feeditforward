from pydantic import BaseModel
from enum import Enum

from .pickup_job import PickupJobCreate

class ConsumerRequestFoodOptionEnum(Enum):
    DELIVERY = "Delivery"
    SELF_PICKUP = "Self Pickup"

class ConsumerRequestFoodSchema(BaseModel):
    pickup_job: PickupJobCreate
    leftover_food_id: int
    amount_requested: int
    option: ConsumerRequestFoodOptionEnum
