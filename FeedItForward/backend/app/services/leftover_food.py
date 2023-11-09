from sqlalchemy.orm import Session
from fastapi import HTTPException
import json

import schemas.leftover_food as leftover_food_schemas
from models.leftover_food import LeftoverFood
from models.hawker import Hawker

def get_leftover_food_by_leftover_food_id(db: Session, leftover_food_id: int):
    db_leftover_food = db.query(LeftoverFood).filter(LeftoverFood.leftover_food_id == leftover_food_id).first()
    
    # convert geometry json to dict
    if db_leftover_food.hawker:
        db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)

    return db_leftover_food

def get_leftover_foods_by_hawker_id(db: Session, hawker_id: int):
    db_leftover_foods = db.query(LeftoverFood).filter(LeftoverFood.hawker_id == hawker_id)

     # convert geometry json to dict
    for db_leftover_food in db_leftover_foods:
        if db_leftover_food.hawker and not isinstance(db_leftover_food.hawker.geometry, dict):
            db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)

    return db_leftover_foods

def get_all_available_leftover_foods(db: Session, skip: int = 0, limit: int = 100):
    db_leftover_foods = db.query(LeftoverFood).filter(LeftoverFood.available == True).offset(skip).limit(limit).all()

    # convert geometry json to dict
    for db_leftover_food in db_leftover_foods:
        if db_leftover_food.hawker and not isinstance(db_leftover_food.hawker.geometry, dict):
            db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)


    return db_leftover_foods

def get_all_leftover_foods(db: Session, skip: int = 0, limit: int = 100):
    db_leftover_foods = db.query(LeftoverFood).offset(skip).limit(limit).all()

    # convert geometry json to dict
    for db_leftover_food in db_leftover_foods:
        if db_leftover_food.hawker and not isinstance(db_leftover_food.hawker.geometry, dict):
            db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)


    return db_leftover_foods

def create_leftover_food(db: Session, leftover_food: leftover_food_schemas.LeftoverFoodCreate):
    db_hawker = db.query(Hawker).filter(Hawker.hawker_id == leftover_food.hawker_id).first()
    if not db_hawker:
        raise HTTPException(status_code=400, detail="Invalid hawker_id")

    db_leftover_food = LeftoverFood(
        name=leftover_food.name,
        unit_of_measurement=leftover_food.unit_of_measurement,
        amount=leftover_food.amount,
        photo=leftover_food.photo,
        time_passed=leftover_food.time_passed,
        available=True,
        hawker_id=leftover_food.hawker_id,
    )
    
    db.add(db_leftover_food)
    db.commit()
    db.refresh(db_leftover_food)

    # convert geometry json to dict
    if db_leftover_food.hawker:
        db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)

    return db_leftover_food

def update_leftover_food(db: Session, updated_leftover_food: leftover_food_schemas.LeftoverFoodUpdate):
    db_leftover_food = db.query(LeftoverFood).filter(LeftoverFood.leftover_food_id == updated_leftover_food.leftover_food_id).first()
    if not db_leftover_food:
        return None

    # Update LeftoverFood
    updated_leftover_food_data = updated_leftover_food.model_dump(exclude_unset=True)
    for key, value in updated_leftover_food_data.items():
        setattr(db_leftover_food, key, value)
    
    db.add(db_leftover_food)
    db.commit()
    db.refresh(db_leftover_food)

    # convert geometry json to dict
    if db_leftover_food.hawker:
        db_leftover_food.hawker.geometry = json.loads(db_leftover_food.hawker.geometry)

    return db_leftover_food
