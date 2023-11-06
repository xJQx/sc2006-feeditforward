from fastapi import HTTPException
from sqlalchemy.orm import Session

import schemas.user as user_schemas
import services.user as user_services


class AuthController:
  def signup(db: Session, user: user_schemas.UserCreate):
    db_user = user_services.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered!")

    return user_services.create_user(db=db, user=user)
  
  def login(db: Session, user: user_schemas.UserLogin):
    db_user = user_services.login_user(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid login credentials")

    return db_user
    
  def loginWithGoogle():
    # TODO: Login with Google
    raise HTTPException(status_code=404, detail="Login with Google not implemented yet.")