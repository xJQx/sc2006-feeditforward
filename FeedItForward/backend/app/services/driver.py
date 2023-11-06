from sqlalchemy.orm import Session

import services.user as user_services
import schemas.driver as driver_schemas
import schemas.user as user_schemas
from models.driver import Driver
from models.user import User

def get_driver_by_user_id(db: Session, user_id: int):
    return db.query(Driver).filter(Driver.user_id == user_id).first()

def get_driver_by_driver_id(db: Session, driver_id: int):
    return db.query(Driver).filter(Driver.driver_id == driver_id).first()

def get_all_drivers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Driver).offset(skip).limit(limit).all()

def create_driver(db: Session, user: driver_schemas.DriverCreate):
    user_to_create = user_schemas.UserCreate(
        name=user.name,
        email=user.email,
        contact_number=user.contact_number,
        address=user.address,
        password=user.password,
        role=user_schemas.Role.DRIVER
    )
    db_user = user_services.create_user(db, user_to_create)
    
    if not db_user:
        return None

    db_driver = Driver(
        user_id=db_user.user_id,
        driver_id=db_user.user_id,
        vehicle_number=user.vehicle_number,
        licence_number=user.licence_number
    )
    
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def update_driver(db: Session, updated_driver: driver_schemas.DriverUpdate):
    db_user = db.query(User).filter(User.user_id == updated_driver.user_id).first()
    db_driver = db.query(Driver).filter(Driver.driver_id == updated_driver.driver_id).first()
    if not db_user or not db_driver:
        return None
    
    # Update User
    updated_user_data = updated_driver.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Update Driver
    updated_driver_data = updated_driver.model_dump(exclude_unset=True)
    for key, value in updated_driver_data.items():
        setattr(db_driver, key, value)
    
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver
