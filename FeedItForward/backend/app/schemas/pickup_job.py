from pydantic import BaseModel

from .food import LeftoverFood
from .misc import Geometry

class PickupJobBase(BaseModel):
    food: LeftoverFood
    startLocation: Geometry
    endLocation: Geometry
    consumer_id: int

class PickupJob(PickupJobBase):
    pickup_job_id: int
    driver_id: int

    class Config:
        orm_mode = True

class PickupJobCreate(PickupJobBase):
    pass

class PickupJobUpdate(PickupJobBase):
    pickup_job_id: int
    driver_id: int