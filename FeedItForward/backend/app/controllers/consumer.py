from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.consumer as consumer_services
import services.review as review_services
import services.priority_request as priority_request_services
import services.pickup_job as pickup_job_services

import schemas.consumer as consumer_schemas
import schemas.review as review_schemas
import schemas.priority_request as priority_request_schemas
import schemas.pickup_job as pickup_job_schemas

class ConsumerController:
  # -------------------------------------------------------- #
  # -------------------- Business Logic -------------------- #
  # -------------------------------------------------------- #
  def submitPriorityRequest(db: Session, priority_request: priority_request_schemas.PriorityRequestCreate):
    db_priority_request = priority_request_services.create_priority_request(db, priority_request)
    return db_priority_request

  def submitReview(db: Session, review: review_schemas.ReviewCreate):
    db_review = review_services.create_review(db, review)
    return db_review
  
  def editReview(db: Session, updated_review: review_schemas.ReviewUpdate):
    db_review = review_services.update_review(db, updated_review)
    return db_review
  
  def requestFood(db: Session, pickup_job: pickup_job_schemas.PickupJobCreate):
    db_pickup_job = pickup_job_services.create_pickup_job(db, pickup_job)
    return db_pickup_job
  
  
  # ------------------------------------------------------------ #
  # -------------------- Consumer (CRUD) ----------------------- #
  # ------------------------------------------------------------ #
  # ----- Consumer ----- #
  def getConsumerByUserId(db: Session, user_id: int):
    consumer = consumer_services.get_consumer_by_user_id(db, user_id=user_id)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
  
  def getConsumerByConsumerId(db: Session, consumer_id: int):
    consumer = consumer_services.get_consumer_by_consumer_id(db, consumer_id=consumer_id)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
  
  def getAllConsumers(db: Session, skip: int, limit: int):
    consumers = consumer_services.get_all_consumers(db, skip=skip, limit=limit)
    return consumers
  
  def updateConsumer(db: Session, updated_consumer: consumer_schemas.ConsumerUpdate):
    consumer = consumer_services.update_consumer(db, updated_consumer)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
