from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.review as review_schemas
from models.review import Review
from models.consumer import Consumer
from models.hawker import Hawker

def get_review_by_review_id(db: Session, review_id: int):
    db_review = db.query(Review).filter(Review.review_id == review_id).first()

    # Load photos for response
    if db_review:
        db_review.photos = db_review.photos.split(",")

    # convert geometry json to dict
    if db_review.hawker:
        db_review.hawker.geometry = json.loads(db_review.hawker.geometry)

    return db_review

def get_reviews_by_consumer_id(db: Session, consumer_id: int):
    db_reviews = db.query(Review).filter(Review.consumer_id == consumer_id)

    # Load photos and convert geometry json to dict for response
    for db_review in db_reviews:
        db_review.photos = db_review.photos.split(",")

        if db_review.hawker and not isinstance(db_review.hawker.geometry, dict):
            db_review.hawker.geometry = json.loads(db_review.hawker.geometry)
    
    return db_reviews

def get_reviews_by_hawker_id(db: Session, hawker_id: int):
    db_reviews = db.query(Review).filter(Review.hawker_id == hawker_id)

    # Load photos and convert geometry json to dict for response
    for db_review in db_reviews:
        db_review.photos = db_review.photos.split(",")
        
        if db_review.hawker and not isinstance(db_review.hawker.geometry, dict):
            db_review.hawker.geometry = json.loads(db_review.hawker.geometry)
    
    return db_reviews

def get_all_reviews(db: Session, skip: int = 0, limit: int = 100):
    db_reviews = db.query(Review).offset(skip).limit(limit).all()
    
    # Load photos and convert geometry json to dict for response
    for db_review in db_reviews:
        db_review.photos = db_review.photos.split(",")
        
        if db_review.hawker and not isinstance(db_review.hawker.geometry, dict):
            db_review.hawker.geometry = json.loads(db_review.hawker.geometry)
    
    return db_reviews

def create_review(db: Session, review: review_schemas.ReviewCreate):
    db_consumer = db.query(Consumer).filter(Consumer.consumer_id == review.consumer_id).first()
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumer_id")
    
    db_hawker = db.query(Hawker).filter(Hawker.hawker_id == review.hawker_id).first()
    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawker_id")

    db_review = Review(
        description=review.description,
        rating=review.rating,
        photos=",".join(review.photos),
        flagged=False,
        flagged_reason=".",
        consumer_id=review.consumer_id,
        hawker_id=review.hawker_id
    )
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    # Load photos for response
    db_review.photos = db_review.photos.split(",")

    # convert geometry json to dict
    if db_review.hawker:
        db_review.hawker.geometry = json.loads(db_review.hawker.geometry)

    return db_review

def update_review(db: Session, updated_review: review_schemas.ReviewUpdate):
    db_review = db.query(Review).filter(Review.review_id == updated_review.review_id).first()
    if not db_review:
        return None
    
    db_consumer = db.query(Consumer).filter(Consumer.consumer_id == updated_review.consumer_id).first()
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumer_id")


    # Update Review
    updated_review_data = updated_review.model_dump(exclude_unset=True)
    for key, value in updated_review_data.items():
        if key.lower() == "photos":
            setattr(db_review, key, ",".join(value))
        else:
            setattr(db_review, key, value)
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    # Load photos for response
    db_review.photos = db_review.photos.split(",")

    # convert geometry json to dict
    if db_review.hawker:
        db_review.hawker.geometry = json.loads(db_review.hawker.geometry)

    return db_review
