from fastapi import HTTPException
from sqlalchemy.orm import Session
import json

import services.consumer as consumer_services
import services.review as review_services
import services.priority_request as priority_request_services
import services.pickup_job as pickup_job_services
import services.leftover_food as leftover_food_services
import services.notification as notification_services
import services.admin as admin_services

import schemas.consumer as consumer_schemas
import schemas.review as review_schemas
import schemas.priority_request as priority_request_schemas
import schemas.pickup_job as pickup_job_schemas
import schemas.leftover_food as leftover_food_schemas
import schemas.consumer_controller as consumer_controller_schemas
import schemas.notification as notification_schemas

class ConsumerController:
  # -------------------------------------------------------- #
  # -------------------- Business Logic -------------------- #
  # -------------------------------------------------------- #
  def submitPriorityRequest(db: Session, priority_request: priority_request_schemas.PriorityRequestCreate):
    db_priority_request = priority_request_services.create_priority_request(db, priority_request)
    
    # Notification for Consumer
    db_admin = admin_services.get_all_admins(db, 0, 1)[0];
    consumer_notification = notification_schemas.NotificationCreate(
      admin_id=db_admin.admin_id,
      receiver_user_id=priority_request.consumer_id,
      title="[Pending] Food Priority Request",
      description="Your request for food priority has been submitted. Please be patience while our staff verify your details."
    )
    notification_services.create_notification(db, consumer_notification)
    return db_priority_request

  def submitReview(db: Session, review: review_schemas.ReviewCreate):
    db_review = review_services.create_review(db, review)
    return db_review
  
  def editReview(db: Session, updated_review: review_schemas.ReviewUpdate):
    db_review = review_services.update_review(db, updated_review)
    return db_review
  
  def requestFood(db: Session, pickup_job: pickup_job_schemas.PickupJobCreate, leftover_food_id: int, amount_requested: int, option: consumer_controller_schemas.ConsumerRequestFoodOptionEnum):
    leftover_food: leftover_food_schemas.LeftoverFood = leftover_food_services.get_leftover_food_by_leftover_food_id(db, leftover_food_id)
    if not leftover_food:
      raise HTTPException(status_code=404, detail="Invalid leftover_food_id")
    if leftover_food.hawker and isinstance(leftover_food.hawker.geometry, dict):
      leftover_food.hawker.geometry = json.dumps(leftover_food.hawker.geometry)
    
    # Update LeftoverFood
    amount_left_available = leftover_food.amount - amount_requested
    updated_leftover_food = leftover_food_schemas.LeftoverFoodUpdate(
      leftover_food_id=leftover_food_id,
      amount=amount_left_available,
      available=True if amount_left_available > 0 else False,
      name=leftover_food.name,
      photo=leftover_food.photo,
      time_passed=leftover_food.time_passed,
      unit_of_measurement=leftover_food.unit_of_measurement
    )
    updated_leftover_food_db = leftover_food_services.update_leftover_food(db, updated_leftover_food=updated_leftover_food)
    if updated_leftover_food_db.hawker and isinstance(updated_leftover_food_db.hawker.geometry, dict):
      updated_leftover_food_db.hawker.geometry = json.dumps(updated_leftover_food_db.hawker.geometry)
    
    db_admin = admin_services.get_all_admins(db, 0, 1)[0];

    match option.value:
      case "Delivery":
        # Notification for Consumer
        consumer_notification = notification_schemas.NotificationCreate(
          admin_id=db_admin.admin_id,
          receiver_user_id=pickup_job.consumer_id,
          title="Food Request Sent",
          description="You have send a food request for {0}'s {1}. A driver will pickup your order and deliver it to you soon.".format(leftover_food.hawker.business_name, leftover_food.name)
        )
        notification_services.create_notification(db, consumer_notification)
        
        # Notification for Hawker
        consumer_notification = notification_schemas.NotificationCreate(
          admin_id=db_admin.admin_id,
          receiver_user_id=leftover_food.hawker_id,
          title="Leftover Food Claimed",
          description="Your leftover food, {0}, has been claimed. A driver will be coming to pickup the food. Thank you!".format(leftover_food.name)
        )
        notification_services.create_notification(db, consumer_notification)
        
        # Create Pickup Job
        db_pickup_job = pickup_job_services.create_pickup_job(db, pickup_job)

        return db_pickup_job
      case "Self Pickup":
        # Notification for Consumer
        consumer_notification = notification_schemas.NotificationCreate(
          admin_id=db_admin.admin_id,
          receiver_user_id=pickup_job.consumer_id,
          title="Food Request Sent",
          description="You have send a food request for {0}'s {1}. Please collect it in person as indicated.".format(leftover_food.hawker.business_name, leftover_food.name)
        )
        notification_services.create_notification(db, consumer_notification)
        
        # Notification for Hawker
        consumer_notification = notification_schemas.NotificationCreate(
          admin_id=db_admin.admin_id,
          receiver_user_id=leftover_food.hawker_id,
          title="Leftover Food Claimed",
          description="Your leftover food, {0}, has been claimed. A Consumer will be coming to pickup the food. Thank you!".format(leftover_food.name)
        )
        notification_services.create_notification(db, consumer_notification)
        return True
    
    return False
  
  
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
