from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.pickup_job as pickup_job_schemas
from models.pickup_job import PickupJob
from models.consumer import Consumer
from models.driver import Driver
from models.leftover_food import LeftoverFood

def get_pickup_job_by_pickup_job_id(db: Session, pickup_job_id: int):
    db_pickup_job = db.query(PickupJob).filter(PickupJob.pickup_job_id == pickup_job_id).first()
    
    # convert geometry json to dict
    if db_pickup_job:
        db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
        db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

        if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker:
            db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)


    return db_pickup_job

def get_pickup_jobs_by_driver_id(db: Session, driver_id: int):
    db_pickup_jobs = db.query(PickupJob).filter(PickupJob.driver_id == driver_id)

    # convert geometry json to dict
    for db_pickup_job in db_pickup_jobs:
        db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
        db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

        if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker and not isinstance(db_pickup_job.leftover_food.hawker.geometry, dict):
            db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)

    return db_pickup_jobs

def get_all_available_pickup_jobs(db: Session, skip: int = 0, limit: int = 100):
    db_pickup_jobs = db.query(PickupJob).filter(PickupJob.status == pickup_job_schemas.PickupJobStatus.AVAILABLE).offset(skip).limit(limit).all()

    # convert geometry json to dict
    for db_pickup_job in db_pickup_jobs:
        db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
        db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

        if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker and not isinstance(db_pickup_job.leftover_food.hawker.geometry, dict):
            db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)

    return db_pickup_jobs

def get_all_pickup_jobs(db: Session, skip: int = 0, limit: int = 100):
    db_pickup_jobs = db.query(PickupJob).offset(skip).limit(limit).all()

    # convert geometry json to dict
    for db_pickup_job in db_pickup_jobs:
        db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
        db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

        if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker and not isinstance(db_pickup_job.leftover_food.hawker.geometry, dict):
            db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)

    return db_pickup_jobs

def create_pickup_job(db: Session, pickup_job: pickup_job_schemas.PickupJobCreate):
    db_consumer = db.query(Consumer).filter(Consumer.consumer_id == pickup_job.consumer_id).first()
    if not db_consumer:
        raise HTTPException(status_code=400, detail="Invalid consumer_id")
    
    db_leftover_food = db.query(LeftoverFood).filter(LeftoverFood.leftover_food_id == pickup_job.leftover_food_id).first()
    if not db_leftover_food:
        raise HTTPException(status_code=400, detail="Invalid leftover_food_id")

    db_pickup_job = PickupJob(
        start_location=pickup_job.start_location.model_dump_json(),
        end_location=pickup_job.end_location.model_dump_json(),
        description=pickup_job.description,
        status=pickup_job.status,
        leftover_food_id=pickup_job.leftover_food_id,
        consumer_id=pickup_job.consumer_id,
    )
    
    db.add(db_pickup_job)
    db.commit()
    db.refresh(db_pickup_job)

    # convert geometry json to dict
    db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
    db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

    if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker:
        db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)

    return db_pickup_job

def update_pickup_job(db: Session, updated_pickup_job: pickup_job_schemas.PickupJobUpdate):
    db_pickup_job = db.query(PickupJob).filter(PickupJob.pickup_job_id == updated_pickup_job.pickup_job_id).first()
    if not db_pickup_job:
        return None

    db_driver = db.query(Driver).filter(Driver.driver_id == updated_pickup_job.driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=400, detail="Invalid driver_id")

    # Update PickupJob
    updated_pickup_job_data = updated_pickup_job.model_dump(exclude_unset=True)
    for key, value in updated_pickup_job_data.items():
        if key.lower() == "start_location" or key.lower() == "end_location":
            setattr(db_pickup_job, key, json.dumps(value))
        else:
            setattr(db_pickup_job, key, value)
    
    db.add(db_pickup_job)
    db.commit()
    db.refresh(db_pickup_job)

    # convert geometry json to dict
    db_pickup_job.start_location = json.loads(db_pickup_job.start_location)
    db_pickup_job.end_location = json.loads(db_pickup_job.end_location)

    if db_pickup_job.leftover_food and db_pickup_job.leftover_food.hawker:
        db_pickup_job.leftover_food.hawker.geometry = json.loads(db_pickup_job.leftover_food.hawker.geometry)

    return db_pickup_job
