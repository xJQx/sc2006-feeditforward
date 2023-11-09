from sqlalchemy.orm import Session

import services.user as user_services
import schemas.consumer as consumer_schemas
import schemas.user as user_schemas
from models.consumer import Consumer
from models.user import User

def get_consumer_by_user_id(db: Session, user_id: int):
    return db.query(Consumer).filter(Consumer.user_id == user_id).first()

def get_consumer_by_consumer_id(db: Session, consumer_id: int):
    return db.query(Consumer).filter(Consumer.consumer_id == consumer_id).first()

def get_all_consumers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Consumer).offset(skip).limit(limit).all()

def create_consumer(db: Session, user: consumer_schemas.ConsumerCreate):
    user_to_create = user_schemas.UserCreate(
        name=user.name,
        email=user.email,
        contact_number=user.contact_number,
        address=user.address,
        password=user.password,
        role=user_schemas.Role.CONSUMER,
        ban=False
    )
    db_user = user_services.create_user(db, user_to_create)
    
    if not db_user:
        return None

    db_consumer = Consumer(user_id=db_user.user_id, consumer_id=db_user.user_id)
    
    db.add(db_consumer)
    db.commit()
    db.refresh(db_consumer)
    return db_consumer

def update_consumer(db: Session, updated_consumer: consumer_schemas.ConsumerUpdate):
    db_user = db.query(User).filter(User.user_id == updated_consumer.user_id).first()
    db_consumer = db.query(Consumer).filter(Consumer.consumer_id == updated_consumer.consumer_id).first()
    if not db_user or not db_consumer:
        return None
    
    # Update User
    updated_user_data = updated_consumer.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Update Consumer
    updated_consumer_data = updated_consumer.model_dump(exclude_unset=True)
    for key, value in updated_consumer_data.items():
        setattr(db_consumer, key, value)
    
    db.add(db_consumer)
    db.commit()
    db.refresh(db_consumer)
    return db_consumer
