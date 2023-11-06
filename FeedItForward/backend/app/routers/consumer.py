from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.consumer import ConsumerController

import schemas.consumer as consumer_schemas

router = APIRouter()

@router.get("/consumers", response_model=list[consumer_schemas.Consumer])
def get_all_consumers(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return ConsumerController.getAllConsumers(db, skip, limit)

@router.get('/consumer/{consumer_id}', response_model=consumer_schemas.Consumer)
async def get_consumer_by_consumer_id(consumer_id: str, db: Session = Depends(get_db)):
    return ConsumerController.getConsumerByConsumerId(db, consumer_id)

@router.get('/consumer/userid/{user_id}', response_model=consumer_schemas.Consumer)
async def get_consumer_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return ConsumerController.getConsumerByUserId(db, user_id)

@router.put("/consumer/update", response_model=consumer_schemas.Consumer)
def update_consumer(consumer: consumer_schemas.ConsumerUpdate, db: Session = Depends(get_db)):
    return ConsumerController.updateConsumer(db, consumer)
