from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.driver as driver_services
import schemas.driver as driver_schemas

class DriverController:
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
