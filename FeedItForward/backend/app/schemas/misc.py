from typing import Literal
from enum import Enum
from pydantic import BaseModel

from .priority_request import PriorityRequestActionEnum

class Geometry(BaseModel):
    type: Literal["Point"]
    latitude: float
    longitude: float

class AdminVerifyUserSchema(BaseModel):
    user_id: int
    admin_id: int
    priority_request_id: int
    action: PriorityRequestActionEnum

class ReviewAction(Enum):
    DELETE = "Delete"
    IGNORE = "Ignore"
    CANCEL = "Cancel"

class AdminProcessReviewSchema(BaseModel):
    review_id: int
    action: ReviewAction
