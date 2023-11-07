from pydantic import BaseModel, Field
from typing import Optional

from .consumer import Consumer

class Review(BaseModel):
    review_id: int
    description: str
    rating: float
    photos: list[str]
    flagged: bool
    flagged_reason: Optional[str] = ""

    consumer_id: int
    consumer: Consumer

    class Config:
        orm_mode = True

class ReviewCreate(BaseModel):
    description: str
    rating: float
    photos: list[str]

    consumer_id: int

class ReviewUpdate(BaseModel):
    review_id: int
    description: str
    rating: float
    photos: list[str]
    flagged: bool
    flagged_reason: str

    consumer_id: int
