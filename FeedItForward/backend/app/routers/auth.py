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

@router.post('/signup/admin', response_model=admin_schemas.Admin)
async def signup(user: admin_schemas.AdminCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/consumer', response_model=consumer_schemas.Consumer)
async def signup(user: consumer_schemas.ConsumerCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/driver', response_model=driver_schemas.Driver)
async def signup(user: driver_schemas.DriverCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post('/signup/hawker', response_model=hawker_schemas.Hawker)
async def signup(user: hawker_schemas.HawkerCreate, db: Session = Depends(get_db)):
    return AuthController.signup(db, user)

@router.post("/login", response_model=Union[user_schemas.User, admin_schemas.Admin, consumer_schemas.Consumer, driver_schemas.Driver, hawker_schemas.Hawker])
def login(user: user_schemas.UserLogin, db: Session = Depends(get_db)):
    return AuthController.login(db, user)

@router.post("/login-google", response_model=Union[user_schemas.User, admin_schemas.Admin, consumer_schemas.Consumer, driver_schemas.Driver, hawker_schemas.Hawker])
def login_with_google():
    # TODO: Login with Google
    return AuthController.loginWithGoogle()

