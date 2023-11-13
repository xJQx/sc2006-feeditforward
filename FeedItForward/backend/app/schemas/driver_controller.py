from pydantic import BaseModel

from schemas.pickup_job import PickupJobAction

class DriverProcessPickupJobSchema(BaseModel):
  action: PickupJobAction
  pickup_job_id: int
  driver_id: int
  photo_proofs: list[str]
  