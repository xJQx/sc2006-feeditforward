from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.admin as admin_services
import services.user as user_services
import services.priority_request as priority_request_services
import services.notification as notification_services
import services.review as review_services

import schemas.admin as admin_schemas
import schemas.user as user_schemas
import schemas.priority_request as priority_request_schemas
import schemas.notification as notification_schemas
import schemas.review as review_schemas

class AdminController:
  # -------------------------------------------------------- #
  # -------------------- Business Logic -------------------- #
  # -------------------------------------------------------- #
  def banUser(db: Session, user_id: int):
    user_db = user_services.get_user_by_id(db, user_id)
    if not user_db:
       raise HTTPException(status_code=400, detail="Invalid user_id")
    
    user_update = user_schemas.UserUpdate(
       user_id=user_db.user_id,
       email=user_db.email,
       name=user_db.name,
       contact_number=user_db.contact_number,
       address=user_db.address,
       profile_picture=user_db.profile_picture,
       ban=True
    )

    user_update_db = user_services.update_user(db, user_update)
    return user_update_db

  def verifyUser(db: Session, priority_request_id: int, admin_id: int, user_id: int, action: priority_request_schemas.PriorityRequestActionEnum):
    if not admin_services.get_admin_by_admin_id(db, admin_id):
      raise HTTPException(status_code=400, detail="Invalid admin_id")
    
    if not user_services.get_user_by_id(db, user_id):
      raise HTTPException(status_code=400, detail="Invalid user_id")
    
    db_priority_request: priority_request_schemas.PriorityRequest = priority_request_services.get_priority_request_by_priority_request_id(db, priority_request_id)
    if not db_priority_request:
      raise HTTPException(status_code=400, detail="Invalid priority_request_id")
    
    updated_priority_request = priority_request_schemas.PriorityRequestUpdate(
      priority_request_id=priority_request_id,
      household_income=db_priority_request.household_income,
      house_category=db_priority_request.house_category,
      number_of_residents=db_priority_request.number_of_residents,
      occupation=db_priority_request.occupation,
      status=db_priority_request.status
    )

    match action:
      case priority_request_schemas.PriorityRequestActionEnum.APPROVE:
        # Update Status
        updated_priority_request.status = priority_request_schemas.PriorityRequestStatusEnum.APPROVED
        priority_request_services.update_priority_request(db, updated_priority_request)

        # Create Notification for User
        new_notification = notification_schemas.NotificationCreate(
          admin_id=admin_id,
          receiver_user_id=user_id,
          title="[APPROVED] Request for Food Priority",
          description="Congratulations! Your request for food priority has been approved!"
        )
        AdminController.notifyUser(db, new_notification)
      case priority_request_schemas.PriorityRequestActionEnum.REQUEST:
        # Update Status
        updated_priority_request.status = priority_request_schemas.PriorityRequestStatusEnum.PENDING
        priority_request_services.update_priority_request(db, updated_priority_request)
        
        # Create Notification for User
        new_notification = notification_schemas.NotificationCreate(
          admin_id=admin_id,
          receiver_user_id=user_id,
          title="[PENDING - ACTION REQUIRED] Request for Food Priority",
          description="Please submit more documents to prove that you need the food priority. Please contact the customer service support for instructions to submit the documents."
        )
        AdminController.notifyUser(db, new_notification)
      case priority_request_schemas.PriorityRequestActionEnum.REJECT:
        # Update Status
        updated_priority_request.status = priority_request_schemas.PriorityRequestStatusEnum.REJECTED
        priority_request_services.update_priority_request(db, updated_priority_request)
        
        # Create Notification for User
        new_notification = notification_schemas.NotificationCreate(
          admin_id=admin_id,
          receiver_user_id=user_id,
          title="[REJECTED] Request for Food Priority",
          description="Your request for food priority has been rejected. If you have any queries, please reach out to our customer service support."
        )
        AdminController.notifyUser(db, new_notification)
      case priority_request_schemas.PriorityRequestActionEnum.CANCEL:
        pass
    
    return updated_priority_request

  def notifyUser(db: Session, notification: notification_schemas.NotificationCreate):
    return notification_services.create_notification(db, notification)

  def processReview(db: Session, action: review_schemas.ReviewAction, review_id: int):
    db_review = review_services.get_review_by_review_id(db, review_id=review_id)
    if not db_review:
      raise HTTPException(status_code=400, detail="Invalid review_id")
    
    updated_review = review_schemas.ReviewUpdate(
      review_id=review_id,
      description=db_review.description,
      rating=db_review.rating,
      photos=db_review.photos,
      consumer_id=db_review.consumer_id,
      flagged=db_review.flagged,
      flagged_reason=db_review.flagged_reason
    )

    match action:
      case review_schemas.ReviewAction.DELETE:
        review_services.delete_review(db, review_id=review_id)
      case review_schemas.ReviewAction.IGNORE:
        updated_review.flagged = False
        updated_review.flagged_reason = ""
        review_services.update_review(db, updated_review)
      case review_schemas.ReviewAction.CANCEL:
        pass
    
    return updated_review

  # ------------------------------------------------------------ #
  # -------------------- Admin (CRUD) -------------------------- #
  # ------------------------------------------------------------ #
  # ----- Admin ----- #
  def getAdminByUserId(db: Session, user_id: int):
    admin = admin_services.get_admin_by_user_id(db, user_id=user_id)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
  
  def getAdminByAdminId(db: Session, admin_id: int):
    admin = admin_services.get_admin_by_admin_id(db, admin_id=admin_id)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
  
  def getAllAdmins(db: Session, skip: int, limit: int):
    admins = admin_services.get_all_admins(db, skip=skip, limit=limit)
    return admins
  
  def updateAdmin(db: Session, updated_admin: admin_schemas.AdminUpdate):
    admin = admin_services.update_admin(db, updated_admin)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
