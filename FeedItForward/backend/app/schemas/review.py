from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

from .consumer import Consumer
from .hawker import Hawker

class ReviewAction(Enum):
    DELETE = "Delete"
    IGNORE = "Ignore"
    CANCEL = "Cancel"

class Review(BaseModel):
    review_id: int
    description: str
    rating: float
    photos: list[str]
    flagged: bool
    flagged_reason: Optional[str] = ""

    consumer_id: int
    consumer: Consumer
    
    hawker_id: int
    hawker: Hawker

    class Config:
        orm_mode = True

class ReviewCreate(BaseModel):
    description: str
    rating: float
    photos: list[str]

    consumer_id: int
    hawker_id: int

class ReviewUpdate(BaseModel):
    review_id: int
    description: str
    rating: float
    photos: list[str]
    flagged: bool
    flagged_reason: str

    consumer_id: int
