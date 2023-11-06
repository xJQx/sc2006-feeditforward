from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.user import UserController
from controllers.hawker import HawkerController
import schemas.hawker as hawker_schemas

router = APIRouter()

@router.get('/hawkers/public')
async def getAllPublicHawkers():
    hawkersLocation = UserController.getAllPublicHawkers()
    if hawkersLocation is None:
        raise HTTPException(status_code=404, detail="Public Hawkers not found")
    return hawkersLocation

@router.get("/hawkers", response_model=list[hawker_schemas.Hawker])
def get_all_hawkers(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return HawkerController.getAllHawkers(db, skip, limit)

@router.get('/hawker/{hawker_id}', response_model=hawker_schemas.Hawker)
async def get_hawker_by_hawker_id(hawker_id: str, db: Session = Depends(get_db)):
    return HawkerController.getHawkerByHawkerId(db, hawker_id)

@router.get('/hawker/userid/{user_id}', response_model=hawker_schemas.Hawker)
async def get_hawker_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return HawkerController.getHawkerByUserId(db, user_id)

@router.put("/hawker/update", response_model=hawker_schemas.Hawker)
def update_hawker(hawker: hawker_schemas.HawkerUpdate, db: Session = Depends(get_db)):
    return HawkerController.updateHawker(db, hawker)
