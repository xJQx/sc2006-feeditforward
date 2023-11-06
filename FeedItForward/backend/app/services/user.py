from sqlalchemy.orm import Session

import bcrypt

import models.user as models
import schemas.user as user_schemas

salt = bcrypt.gensalt()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: user_schemas.UserCreate):
    # hash password
    user.password = bcrypt.hashpw(user.password.encode('utf-8'), salt=salt)

    db_user = models.User(**user.model_dump())
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, updated_user: user_schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.user_id == updated_user.user_id).first()
    if not db_user:
        return None
    
    updated_user_data = updated_user.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def login_user(db: Session, user: user_schemas.UserLogin):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        return None
    
    if bcrypt.checkpw(user.password.encode('utf-8'), db_user.password):
        return db_user
    
    print("here")
    return None
