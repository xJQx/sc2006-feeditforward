from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.pickup_job import PickupJobController
import schemas.pickup_job as pickup_job_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "PickupJob (CRUD)",
        "description": "API CRUD Endpoints for PickupJob Model"
    },
]

# --------------------------------------------------------------- #
# -------------------- PickupJob (CRUD) ------------------------- #
# --------------------------------------------------------------- #
@router.get("/pickup-jobs", response_model=list[pickup_job_schemas.PickupJob], tags=["PickupJob (CRUD)"])
def get_all_pickup_jobs(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return PickupJobController.getAllPickupJobs(db, skip, limit)

@router.get("/pickup-jobs/available", response_model=list[pickup_job_schemas.PickupJob], tags=["PickupJob (CRUD)"])
def get_all_available_pickup_jobs(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return PickupJobController.getAllAvailablePickupJobs(db, skip, limit)

@router.get('/pickup-job/{pickup_job_id}', response_model=pickup_job_schemas.PickupJob, tags=["PickupJob (CRUD)"])
async def get_pickup_job_by_pickup_job_id(pickup_job_id: str, db: Session = Depends(get_db)):
    return PickupJobController.getPickupJobByPickupJobId(db, pickup_job_id)

@router.get('/pickup-jobs/driverid/{driver_id}', response_model=list[pickup_job_schemas.PickupJob], tags=["PickupJob (CRUD)"])
async def get_pickup_jobs_by_driver_id(driver_id: str, db: Session = Depends(get_db)):
    return PickupJobController.getPickupJobsByDriverId(db, driver_id)

@router.post("/pickup-jobs/new", response_model=pickup_job_schemas.PickupJob, tags=["PickupJob (CRUD)"])
def create_pickup_job(pickup_job: pickup_job_schemas.PickupJobCreate, db: Session = Depends(get_db)):
    return PickupJobController.createPickupJob(db, pickup_job)

@router.put("/pickup-jobs/update", response_model=pickup_job_schemas.PickupJob, tags=["PickupJob (CRUD)"])
def update_pickup_job(pickup_job: pickup_job_schemas.PickupJobUpdate, db: Session = Depends(get_db)):
    return PickupJobController.updatePickupJob(db, pickup_job)
