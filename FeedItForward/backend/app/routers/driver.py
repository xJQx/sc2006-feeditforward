from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.driver import DriverController

import schemas.driver as driver_schemas

router = APIRouter()

@router.get("/drivers", response_model=list[driver_schemas.Driver])
def get_all_drivers(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return DriverController.getAllDrivers(db, skip, limit)

@router.get('/driver/{driver_id}', response_model=driver_schemas.Driver)
async def get_driver_by_driver_id(driver_id: str, db: Session = Depends(get_db)):
    return DriverController.getDriverByDriverId(db, driver_id)

@router.get('/driver/userid/{user_id}', response_model=driver_schemas.Driver)
async def get_driver_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return DriverController.getDriverByUserId(db, user_id)

@router.put("/driver/update", response_model=driver_schemas.Driver)
def update_driver(driver: driver_schemas.DriverUpdate, db: Session = Depends(get_db)):
    return DriverController.updateDriver(db, driver)
