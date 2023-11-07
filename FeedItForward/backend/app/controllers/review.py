from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.review as review_services
import schemas.review as review_schemas

class ReviewController:
    # ----- Review ----- #
    def getReviewByReviewId(db: Session, review_id: int):
        review = review_services.get_review_by_review_id(db, review_id=review_id)
        if review is None:
            raise HTTPException(status_code=404, detail="Review not found")
        return review

    def getReviewsByConsumerId(db: Session, consumer_id: int):
        review = review_services.get_reviews_by_consumer_id(db, consumer_id=consumer_id)
        if review is None:
            raise HTTPException(status_code=404, detail="No review found for queried consumer id")
        return review
    
    def getReviewsByHawkerId(db: Session, hawker_id: int):
        review = review_services.get_reviews_by_hawker_id(db, hawker_id=hawker_id)
        if review is None:
            raise HTTPException(status_code=404, detail="No review found for queried hawker id")
        return review

    def getAllReviews(db: Session, skip: int, limit: int):
        reviews = review_services.get_all_reviews(db, skip=skip, limit=limit)
        return reviews

    def createReview(db: Session, review: review_schemas.ReviewCreate):
        review = review_services.create_review(db, review);
        if review is None:
            raise HTTPException(status_code=400, detail="Review cannot be created")
        return review
        

    def updateReview(db: Session, updated_review: review_schemas.ReviewUpdate):
        review = review_services.update_review(db, updated_review)
        if review is None:
            raise HTTPException(status_code=404, detail="Review not found")
        return review
