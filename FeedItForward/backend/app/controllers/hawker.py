from fastapi import HTTPException
from sqlalchemy.orm import Session
import json

import services.hawker as hawker_services
import schemas.hawker as hawker_schemas

class HawkerController:
  # ----- Hawker ----- #
  def getHawkerByUserId(db: Session, user_id: int):
    hawker = hawker_services.get_hawker_by_user_id(db, user_id=user_id)
    if hawker is None:
        raise HTTPException(status_code=404, detail="Hawker not found")

    return hawker
  
  def getHawkerByHawkerId(db: Session, hawker_id: int):
    hawker = hawker_services.get_hawker_by_hawker_id(db, hawker_id=hawker_id)
    if hawker is None:
        raise HTTPException(status_code=404, detail="Hawker not found")

    return hawker
  
  def getAllHawkers(db: Session, skip: int, limit: int):
    hawkers = hawker_services.get_all_hawkers(db, skip=skip, limit=limit)
    
    return hawkers
  
  def updateHawker(db: Session, updated_hawker: hawker_schemas.HawkerUpdate):
    hawker = hawker_services.update_hawker(db, updated_hawker)
    if hawker is None:
        raise HTTPException(status_code=404, detail="Hawker not found")
    
    # convert geometry json to dict
    hawker.geometry = json.loads(hawker.geometry)

    return hawker
