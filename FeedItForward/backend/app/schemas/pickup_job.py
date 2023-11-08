from pydantic import BaseModel
from typing import Optional
from enum import Enum

from .leftover_food import LeftoverFood
from .consumer import Consumer
from .driver import Driver
from .misc import Geometry

class PickupJobStatus(Enum):
    AVAILABLE = "Available"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

class PickupJob(BaseModel):
    pickup_job_id: int

    start_location: Geometry
    end_location: Geometry
    description: str
    status: PickupJobStatus
    photo_proofs: list[str]

    leftover_food_id: int
    leftover_food: LeftoverFood

    consumer_id: int
    consumer: Consumer

    driver_id: Optional[int] = None
    driver: Optional[Driver] = None

    class Config:
        orm_mode = True

class PickupJobCreate(BaseModel):
    start_location: Geometry
    end_location: Geometry
    description: str
    status: PickupJobStatus

    leftover_food_id: int
    consumer_id: int

class PickupJobUpdate(BaseModel):
    pickup_job_id: int
    start_location: Geometry
    end_location: Geometry
    description: str
    status: PickupJobStatus
    photo_proofs: list[str]

    driver_id: int
