from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.review import ReviewController

import schemas.review as review_schemas

router = APIRouter()

@router.get("/reviews", response_model=list[review_schemas.Review])
def get_all_reviews(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return ReviewController.getAllReviews(db, skip, limit)

@router.get('/review/{review_id}', response_model=review_schemas.Review)
async def get_review_by_review_id(review_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewByReviewId(db, review_id)

@router.get('/reviews/consumerid/{consumer_id}', response_model=list[review_schemas.Review])
async def get_reviews_by_consumer_id(consumer_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewsByConsumerId(db, consumer_id)

@router.post("/review/new", response_model=review_schemas.Review)
def create_review(review: review_schemas.ReviewCreate, db: Session = Depends(get_db)):
    return ReviewController.createReview(db, review)

@router.put("/review/update", response_model=review_schemas.Review)
def update_review(review: review_schemas.ReviewUpdate, db: Session = Depends(get_db)):
    return ReviewController.updateReview(db, review)
