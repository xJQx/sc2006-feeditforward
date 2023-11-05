from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controllers.user import UserController

import services.user as user_services
import schemas.user as user_schemas

router = APIRouter()

@router.get('/hawkers/public')
async def getAllPublicHawkers():
    hawkersLocation = UserController.getAllPublicHawkers()
    if hawkersLocation is None:
        raise HTTPException(status_code=404, detail="Public Hawkers not found")
    return hawkersLocation
