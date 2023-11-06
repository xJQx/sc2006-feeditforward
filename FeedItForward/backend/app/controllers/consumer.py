from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.consumer as consumer_services
import schemas.consumer as consumer_schemas

class ConsumerController:
  # ----- Consumer ----- #
  def getConsumerByUserId(db: Session, user_id: int):
    consumer = consumer_services.get_consumer_by_user_id(db, user_id=user_id)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
  
  def getConsumerByConsumerId(db: Session, consumer_id: int):
    consumer = consumer_services.get_consumer_by_consumer_id(db, consumer_id=consumer_id)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
  
  def getAllConsumers(db: Session, skip: int, limit: int):
    consumers = consumer_services.get_all_consumers(db, skip=skip, limit=limit)
    return consumers
  
  def updateConsumer(db: Session, updated_consumer: consumer_schemas.ConsumerUpdate):
    consumer = consumer_services.update_consumer(db, updated_consumer)
    if consumer is None:
        raise HTTPException(status_code=404, detail="Consumer not found")
    return consumer
