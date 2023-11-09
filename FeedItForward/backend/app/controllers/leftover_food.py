from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.leftover_food as leftover_food_services
import schemas.leftover_food as leftover_food_schemas

class LeftoverFoodController:
    # ------------------------------------------------------------------ #
    # -------------------- LeftoverFood (CRUD) ------------------------- #
    # ------------------------------------------------------------------ #
    # ----- LeftoverFood ----- #
    def getLeftoverFoodByLeftoverFoodId(db: Session, leftover_food_id: int):
        leftover_food = leftover_food_services.get_leftover_food_by_leftover_food_id(db, leftover_food_id=leftover_food_id)
        if leftover_food is None:
            raise HTTPException(status_code=404, detail="LeftoverFood not found")
        return leftover_food

    def getLeftoverFoodsByHawkerId(db: Session, hawker_id: int):
        leftover_food = leftover_food_services.get_leftover_foods_by_hawker_id(db, hawker_id=hawker_id)
        if leftover_food is None:
            raise HTTPException(status_code=404, detail="No leftover_food found for queried consumer id")
        return leftover_food

    def getAllLeftoverFoods(db: Session, skip: int, limit: int):
        leftover_foods = leftover_food_services.get_all_leftover_foods(db, skip=skip, limit=limit)
        return leftover_foods
    
    def getAllAvailableLeftoverFoods(db: Session, skip: int, limit: int):
        leftover_foods = leftover_food_services.get_all_available_leftover_foods(db, skip=skip, limit=limit)
        return leftover_foods

    def createLeftoverFood(db: Session, leftover_food: leftover_food_schemas.LeftoverFoodCreate):
        leftover_food = leftover_food_services.create_leftover_food(db, leftover_food);
        if leftover_food is None:
            raise HTTPException(status_code=400, detail="LeftoverFood cannot be created")
        return leftover_food
        
    def updateLeftoverFood(db: Session, updated_leftover_food: leftover_food_schemas.LeftoverFoodUpdate):
        leftover_food = leftover_food_services.update_leftover_food(db, updated_leftover_food)
        if leftover_food is None:
            raise HTTPException(status_code=404, detail="LeftoverFood not found")
        return leftover_food
