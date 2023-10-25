from sqlalchemy.orm import Session

import app.models.user as models
import app.schemas.user as schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(*user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
