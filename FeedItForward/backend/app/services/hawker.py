from sqlalchemy.orm import Session
import json

import services.user as user_services
import schemas.hawker as hawker_schemas
import schemas.user as user_schemas
from models.hawker import Hawker
from models.user import User

def get_hawker_by_user_id(db: Session, user_id: int):
    hawker = db.query(Hawker).filter(Hawker.user_id == user_id).first()
    
    # convert geometry json to dict
    hawker.geometry = json.loads(hawker.geometry)

    return hawker

def get_hawker_by_hawker_id(db: Session, hawker_id: int):
    hawker = db.query(Hawker).filter(Hawker.hawker_id == hawker_id).first()
    
    # convert geometry json to dict
    hawker.geometry = json.loads(hawker.geometry)

    return hawker

def get_all_hawkers(db: Session, skip: int = 0, limit: int = 100):
    hawkers =  db.query(Hawker).offset(skip).limit(limit).all()

    # convert geometry json to dict
    for hawker in hawkers:
        hawker.geometry = json.loads(hawker.geometry)
    
    return hawkers

def create_hawker(db: Session, user: hawker_schemas.HawkerCreate):
    user_to_create = user_schemas.UserCreate(
        name=user.name,
        email=user.email,
        contact_number=user.contact_number,
        address=user.address,
        password=user.password,
        role=user_schemas.Role.HAWKER,
        ban=False
    )
    db_user = user_services.create_user(db, user_to_create)
    
    if not db_user:
        return None

    db_hawker = Hawker(
        user_id=db_user.user_id,
        hawker_id=db_user.user_id,
        overall_rating=0.0,
        business_name=user.business_name,
        operating_hours=user.operating_hours,
        food_type=user.food_type,
        geometry=user.geometry.model_dump_json(),
        is_registered=True
    )
    
    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)

    # load json for response
    db_hawker.geometry = json.loads(db_hawker.geometry)

    return db_hawker

def update_hawker(db: Session, updated_hawker: hawker_schemas.HawkerUpdate):
    db_user = db.query(User).filter(User.user_id == updated_hawker.user_id).first()
    db_hawker = db.query(Hawker).filter(Hawker.hawker_id == updated_hawker.hawker_id).first()
    if not db_user or not db_hawker:
        return None
    
    # Update User
    updated_user_data = updated_hawker.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Update Hawker
    updated_hawker_data = updated_hawker.model_dump(exclude_unset=True)
    for key, value in updated_hawker_data.items():
        if key.lower() == "geometry":
            setattr(db_hawker, key, json.dumps(value))
        else:
            setattr(db_hawker, key, value)
    
    db.add(db_hawker)
    db.commit()
    db.refresh(db_hawker)
    return db_hawker
