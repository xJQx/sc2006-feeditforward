from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.driver import DriverController

import schemas.driver as driver_schemas
import schemas.pickup_job as pickup_job_schemas
import schemas.driver_controller as driver_controller_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Driver Controller",
        "description": "API Endpoints for methods implemented by the Driver Controller"
    },
    {
        "name": "Driver (CRUD)",
        "description": "API CRUD Endpoints for Driver Model"
    },
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
@router.post("/driver-controller/process-pickup-job", response_model=pickup_job_schemas.PickupJobUpdate, tags=["Driver Controller"])
def process_pickup_job(requestBody: driver_controller_schemas.DriverProcessPickupJobSchema, db: Session = Depends(get_db)):
    return DriverController.processPickupJob(
        db,
        action=requestBody.action,
        pickup_job_id=requestBody.pickup_job_id,
        driver_id=requestBody.driver_id,
        photo_proofs=requestBody.photo_proofs)

# ------------------------------------------------------------ #
# -------------------- Driver (CRUD) ------------------------- #
# ------------------------------------------------------------ #
@router.get("/drivers", response_model=list[driver_schemas.Driver], tags=["Driver (CRUD)"])
def get_all_drivers(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return DriverController.getAllDrivers(db, skip, limit)

@router.get('/driver/{driver_id}', response_model=driver_schemas.Driver, tags=["Driver (CRUD)"])
async def get_driver_by_driver_id(driver_id: str, db: Session = Depends(get_db)):
    return DriverController.getDriverByDriverId(db, driver_id)

@router.get('/driver/userid/{user_id}', response_model=driver_schemas.Driver, tags=["Driver (CRUD)"])
async def get_driver_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return DriverController.getDriverByUserId(db, user_id)

@router.put("/driver/update", response_model=driver_schemas.Driver, tags=["Driver (CRUD)"])
def update_driver(driver: driver_schemas.DriverUpdate, db: Session = Depends(get_db)):
    return DriverController.updateDriver(db, driver)
