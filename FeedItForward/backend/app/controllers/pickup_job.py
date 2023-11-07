from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.pickup_job as pickup_job_services
import schemas.pickup_job as pickup_job_schemas

class PickupJobController:
    # ----- PickupJob ----- #
    def getPickupJobByPickupJobId(db: Session, pickup_job_id: int):
        pickup_job = pickup_job_services.get_pickup_job_by_pickup_job_id(db, pickup_job_id=pickup_job_id)
        if pickup_job is None:
            raise HTTPException(status_code=404, detail="PickupJob not found")
        return pickup_job

    def getPickupJobsByDriverId(db: Session, driver_id: int):
        pickup_job = pickup_job_services.get_pickup_jobs_by_driver_id(db, driver_id=driver_id)
        if pickup_job is None:
            raise HTTPException(status_code=404, detail="No pickup_job found for queried consumer id")
        return pickup_job

    def getAllPickupJobs(db: Session, skip: int, limit: int):
        pickup_jobs = pickup_job_services.get_all_pickup_jobs(db, skip=skip, limit=limit)
        return pickup_jobs
    
    def getAllAvailablePickupJobs(db: Session, skip: int, limit: int):
        pickup_jobs = pickup_job_services.get_all_available_pickup_jobs(db, skip=skip, limit=limit)
        return pickup_jobs

    def createPickupJob(db: Session, pickup_job: pickup_job_schemas.PickupJobCreate):
        pickup_job = pickup_job_services.create_pickup_job(db, pickup_job);
        if pickup_job is None:
            raise HTTPException(status_code=400, detail="PickupJob cannot be created")
        return pickup_job
        
    def updatePickupJob(db: Session, updated_pickup_job: pickup_job_schemas.PickupJobUpdate):
        pickup_job = pickup_job_services.update_pickup_job(db, updated_pickup_job)
        if pickup_job is None:
            raise HTTPException(status_code=404, detail="PickupJob not found")
        return pickup_job
