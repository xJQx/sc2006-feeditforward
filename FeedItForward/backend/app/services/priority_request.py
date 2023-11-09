from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime

import schemas.priority_request as priority_request_schemas
from models.priority_request import PriorityRequest
from models.consumer import Consumer

def get_priority_request_by_priority_request_id(db: Session, priority_request_id: int):
    db_priority_request = db.query(PriorityRequest).filter(PriorityRequest.priority_request_id == priority_request_id).first()

    return db_priority_request

def get_priority_requests_by_consumer_id(db: Session, consumer_id: int):
    db_priority_requests = db.query(PriorityRequest).filter(PriorityRequest.consumer_id == consumer_id)
    
    return db_priority_requests

def get_priority_requests_by_status(db: Session, status: priority_request_schemas.PriorityRequestStatusEnum):
    db_priority_requests = db.query(PriorityRequest).filter(PriorityRequest.status == status)
    
    return db_priority_requests

def get_all_priority_requests(db: Session, skip: int = 0, limit: int = 100):
    db_priority_requests = db.query(PriorityRequest).offset(skip).limit(limit).all()

    return db_priority_requests

def create_priority_request(db: Session, priority_request: priority_request_schemas.PriorityRequestCreate):
    db_consumer = db.query(Consumer).filter(Consumer.consumer_id == priority_request.consumer_id).first()
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumer_id")

    db_priority_request = PriorityRequest(
        household_income= priority_request.household_income,
        number_of_residents= priority_request.number_of_residents,
        occupation= priority_request.occupation,
        house_category= priority_request.house_category,
        status= priority_request_schemas.PriorityRequestStatusEnum.PENDING,
        
        date_created= datetime.now(),
        date_updated= datetime.now(),

        consumer_id= priority_request.consumer_id,
    )
    
    db.add(db_priority_request)
    db.commit()
    db.refresh(db_priority_request)
    
    return db_priority_request

def update_priority_request(db: Session, updated_priority_request: priority_request_schemas.PriorityRequestUpdate):
    db_priority_request = db.query(PriorityRequest).filter(PriorityRequest.priority_request_id == updated_priority_request.priority_request_id).first()
    if not db_priority_request:
        return None

    # Update PriorityRequest
    updated_priority_request_data = updated_priority_request.model_dump(exclude_unset=True)
    for key, value in updated_priority_request_data.items():
        setattr(db_priority_request, key, value)
    
    db.add(db_priority_request)
    db.commit()
    db.refresh(db_priority_request)

    return db_priority_request
