from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.auth import AuthController

import schemas.user as user_schemas

router = APIRouter(prefix="/auth")


@router.post('/signup', response_model=user_schemas.User)
async def signup(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post("/login", response_model=user_schemas.User)
def login(user: user_schemas.UserLogin, db: Session = Depends(get_db)):
    return AuthController.login(db, user)

@router.post("/login-google", response_model=user_schemas.User)
def login_with_google():
    # TODO: Login with Google
    return AuthController.loginWithGoogle()

