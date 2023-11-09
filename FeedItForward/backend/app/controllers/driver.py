from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.driver as driver_services
import services.pickup_job as pickup_job_services

import schemas.driver as driver_schemas
import schemas.pickup_job as pickup_job_schemas

class DriverController:
  # -------------------------------------------------------- #
  # -------------------- Business Logic -------------------- #
  # -------------------------------------------------------- #
  def processPickupJob(db: Session, action: pickup_job_schemas.PickupJobAction, pickup_job_id: int, driver_id: int, photo_proofs: list[str]):
    db_pickup_job = pickup_job_services.get_pickup_job_by_pickup_job_id(db, pickup_job_id)

    updated_pickup_job = pickup_job_schemas.PickupJobUpdate(
      pickup_job_id=pickup_job_id,
      description=db_pickup_job.description,
      start_location=db_pickup_job.start_location,
      end_location=db_pickup_job.end_location,
      driver_id=db_pickup_job.driver_id,
      status=db_pickup_job.status,
      photo_proofs=db_pickup_job.photo_proofs,
    )

    match action:
      case pickup_job_schemas.PickupJobAction.ACCEPT:
          updated_pickup_job.driver_id = driver_id
          updated_pickup_job.status = pickup_job_schemas.PickupJobStatus.IN_PROGRESS
          pickup_job_services.update_pickup_job(db, updated_pickup_job)
      case pickup_job_schemas.PickupJobAction.IGNORE:
          pass
      case pickup_job_schemas.PickupJobAction.COMPLETE:
          updated_pickup_job.photo_proofs = photo_proofs
          updated_pickup_job.status = pickup_job_schemas.PickupJobStatus.COMPLETED
          pickup_job_services.update_pickup_job(db, updated_pickup_job)
    
    return updated_pickup_job

  # ------------------------------------------------------------ #
  # -------------------- Driver (CRUD) ------------------------- #
  # ------------------------------------------------------------ #
  # ----- Driver ----- #
  def getDriverByUserId(db: Session, user_id: int):
    driver = driver_services.get_driver_by_user_id(db, user_id=user_id)
    if driver is None:
        raise HTTPException(status_code=404, detail="Driver not found")
    return driver
  
  def getDriverByDriverId(db: Session, driver_id: int):
    driver = driver_services.get_driver_by_driver_id(db, driver_id=driver_id)
    if driver is None:
        raise HTTPException(status_code=404, detail="Driver not found")
    return driver
  
  def getAllDrivers(db: Session, skip: int, limit: int):
    drivers = driver_services.get_all_drivers(db, skip=skip, limit=limit)
    return drivers
  
  def updateDriver(db: Session, updated_driver: driver_schemas.DriverUpdate):
    driver = driver_services.update_driver(db, updated_driver)
    if driver is None:
        raise HTTPException(status_code=404, detail="Driver not found")
    return driver
