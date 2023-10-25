from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

import app.services.user as user_services
import app.schemas.user as user_schemas

router = APIRouter(prefix="/user")


@router.get('/{user_id}', response_model=user_schemas.User)
async def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    user = user_services.get_user_by_id(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/users/", response_model=list[user_schemas.User])
def get_all_users(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    users = user_services.get_all_users(db, skip=skip, limit=limit)
    return users


@router.post("/users/", response_model=user_schemas.User)
def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = user_services.get_user_by_id(db, user_id=user.id)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists!")
    return user_services.create_user(db=db, user=user)