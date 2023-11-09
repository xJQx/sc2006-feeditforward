from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.review import ReviewController

import schemas.review as review_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Review (CRUD)",
        "description": "API CRUD Endpoints for Review Model"
    },
]

# ------------------------------------------------------------ #
# -------------------- Review (CRUD) ------------------------- #
# ------------------------------------------------------------ #
@router.get("/reviews", response_model=list[review_schemas.Review], tags=["Review (CRUD)"])
def get_all_reviews(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return ReviewController.getAllReviews(db, skip, limit)

@router.get('/review/{review_id}', response_model=review_schemas.Review, tags=["Review (CRUD)"])
async def get_review_by_review_id(review_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewByReviewId(db, review_id)

@router.get('/reviews/consumerid/{consumer_id}', response_model=list[review_schemas.Review], tags=["Review (CRUD)"])
async def get_reviews_by_consumer_id(consumer_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewsByConsumerId(db, consumer_id)

@router.get('/reviews/hawkerid/{hawker_id}', response_model=list[review_schemas.Review], tags=["Review (CRUD)"])
async def get_reviews_by_hawker_id(hawker_id: str, db: Session = Depends(get_db)):
    return ReviewController.getReviewsByHawkerId(db, hawker_id)

@router.post("/review/new", response_model=review_schemas.Review, tags=["Review (CRUD)"])
def create_review(review: review_schemas.ReviewCreate, db: Session = Depends(get_db)):
    return ReviewController.createReview(db, review)

@router.put("/review/update", response_model=review_schemas.Review, tags=["Review (CRUD)"])
def update_review(review: review_schemas.ReviewUpdate, db: Session = Depends(get_db)):
    return ReviewController.updateReview(db, review)

@router.get("/review/delete/{review_id}", tags=["Review (CRUD)"])
def delete_review(review_id: int, db: Session = Depends(get_db)):
    return ReviewController.deleteReview(db, review_id)
