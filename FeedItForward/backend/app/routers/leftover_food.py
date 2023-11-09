from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.leftover_food import LeftoverFoodController
import schemas.leftover_food as leftover_food_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "LeftoverFood (CRUD)",
        "description": "API CRUD Endpoints for LeftoverFood Model"
    },
]

# ------------------------------------------------------------------ #
# -------------------- LeftoverFood (CRUD) ------------------------- #
# ------------------------------------------------------------------ #
@router.get("/leftover-foods", response_model=list[leftover_food_schemas.LeftoverFood], tags=["LeftoverFood (CRUD)"])
def get_all_leftover_foods(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return LeftoverFoodController.getAllLeftoverFoods(db, skip, limit)

@router.get("/leftover-foods/available", response_model=list[leftover_food_schemas.LeftoverFood], tags=["LeftoverFood (CRUD)"])
def get_all_available_leftover_foods(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return LeftoverFoodController.getAllAvailableLeftoverFoods(db, skip, limit)

@router.get('/leftover-food/{leftover_food_id}', response_model=leftover_food_schemas.LeftoverFood, tags=["LeftoverFood (CRUD)"])
async def get_leftover_food_by_leftover_food_id(leftover_food_id: str, db: Session = Depends(get_db)):
    return LeftoverFoodController.getLeftoverFoodByLeftoverFoodId(db, leftover_food_id)

@router.get('/leftover-foods/hawkerid/{hawker_id}', response_model=list[leftover_food_schemas.LeftoverFood], tags=["LeftoverFood (CRUD)"])
async def get_leftover_foods_by_hawker_id(hawker_id: str, db: Session = Depends(get_db)):
    return LeftoverFoodController.getLeftoverFoodsByHawkerId(db, hawker_id)

@router.post("/leftover-foods/new", response_model=leftover_food_schemas.LeftoverFood, tags=["LeftoverFood (CRUD)"])
def create_leftover_food(leftover_food: leftover_food_schemas.LeftoverFoodCreate, db: Session = Depends(get_db)):
    return LeftoverFoodController.createLeftoverFood(db, leftover_food)

@router.put("/leftover-foods/update", response_model=leftover_food_schemas.LeftoverFood, tags=["LeftoverFood (CRUD)"])
def update_leftover_food(leftover_food: leftover_food_schemas.LeftoverFoodUpdate, db: Session = Depends(get_db)):
    return LeftoverFoodController.updateLeftoverFood(db, leftover_food)
