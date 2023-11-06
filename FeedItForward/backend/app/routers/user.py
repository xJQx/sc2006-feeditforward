from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.user import UserController

import schemas.user as user_schemas

router = APIRouter()

@router.get('/user/{user_id}', response_model=user_schemas.User)
async def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    return UserController.getUserById(db, user_id)


@router.get("/users", response_model=list[user_schemas.User])
def get_all_users(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return UserController.getAllUsers(db, skip, limit)
