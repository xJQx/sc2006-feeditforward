from typing import Literal

from pydantic import BaseModel


class Review(BaseModel):
    review_id: int
    customer_id: int
    text: int
    rating: int
    flagged: bool

class PriorityRequest(BaseModel):
    priority_request_id: int
    customer_id: int
    status: Literal["pending", "review", "approved"]
    document: str

class CustomerServiceSupportHistory(BaseModel):
    user_id: int
    admin_id: int
    text_history: str

class Geometry(BaseModel):
    type: Literal["Point"]
    latitude: float
    longitude: float

class Image(BaseModel):
    src: str
    alt: str