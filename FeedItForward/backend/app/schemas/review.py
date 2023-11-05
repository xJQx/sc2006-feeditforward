from pydantic import BaseModel

class ReviewBase(BaseModel):
    user_id: int
    description: int
    rating: int
    photos: list[str]
    flagged: bool

class Review(ReviewBase):
    review_id: int
    flaggedReason: str

    class Config:
        orm_mode = True

class ReviewCreate(ReviewBase):
    flaggedReason: str