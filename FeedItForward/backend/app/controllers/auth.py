from fastapi import HTTPException
from sqlalchemy.orm import Session
import json

import schemas.user as user_schemas
import services.user as user_services
import services.admin as admin_services
import services.consumer as consumer_services
import services.driver as driver_services
import services.hawker as hawker_services


class AuthController:
  def signup(db: Session, user: user_schemas.UserCreate):
    db_user = user_services.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered!")

    match user.role:
        case user_schemas.Role.ADMIM:
            return admin_services.create_admin(db=db, user=user)
        case user_schemas.Role.CONSUMER:
            return consumer_services.create_consumer(db=db, user=user)
        case user_schemas.Role.DRIVER:
            return driver_services.create_driver(db=db, user=user)
        case user_schemas.Role.HAWKER:
            return hawker_services.create_hawker(db=db, user=user)
    raise HTTPException(status_code=400, detail="User role is not valid.")
  
  def login(db: Session, user: user_schemas.UserLogin):
    db_user = user_services.login_user(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid login credentials")
    if db_user.ban:
        raise HTTPException(status_code=403, detail="Forbidden. User has been banned")
    
    match db_user.role:
        case user_schemas.Role.ADMIM:
            return admin_services.get_admin_by_user_id(db, db_user.user_id)
        case user_schemas.Role.CONSUMER:
            return consumer_services.get_consumer_by_user_id(db, db_user.user_id)
        case user_schemas.Role.DRIVER:
            return driver_services.get_driver_by_user_id(db, db_user.user_id)
        case user_schemas.Role.HAWKER:
            return hawker_services.get_hawker_by_user_id(db, db_user.user_id)
       
    return db_user
    
  def loginWithGoogle():
    # TODO: Login with Google
    raise HTTPException(status_code=404, detail="Login with Google not implemented yet.")