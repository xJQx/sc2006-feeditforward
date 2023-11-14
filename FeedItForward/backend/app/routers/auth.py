from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Union

from database import get_db
from controllers.auth import AuthController

import schemas.user as user_schemas
import schemas.admin as admin_schemas
import schemas.consumer as consumer_schemas
import schemas.driver as driver_schemas
import schemas.hawker as hawker_schemas

router = APIRouter(prefix="/auth")

tags_metadata = [
    {
        "name": "Auth Controller",
        "description": "API Endpoints for methods implemented by the Auth Controller"
    },
    {
        "name": "Auth (CRUD)",
        "description": "API CRUD Endpoints for Auth Model"
    },
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
@router.post('/signup/admin', response_model=admin_schemas.Admin, tags=["Auth Controller"])
async def signup_admin(user: admin_schemas.AdminCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/consumer', response_model=consumer_schemas.Consumer, tags=["Auth Controller"])
async def signup_consumer(user: consumer_schemas.ConsumerCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/driver', response_model=driver_schemas.Driver, tags=["Auth Controller"])
async def signup_driver(user: driver_schemas.DriverCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/hawker', response_model=hawker_schemas.Hawker, tags=["Auth Controller"])
async def signup_hawker(user: hawker_schemas.HawkerCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post("/login", response_model=Union[user_schemas.User, admin_schemas.Admin, consumer_schemas.Consumer, driver_schemas.Driver, hawker_schemas.Hawker], tags=["Auth Controller"])
def login(user: user_schemas.UserLogin, db: Session = Depends(get_db)):
    return AuthController.login(db, user)

@router.get("/login-google", response_model=bool, tags=["Auth Controller"])
def login_with_google(email: str, db: Session = Depends(get_db)):
    return AuthController.loginWithGoogle(db, email)

