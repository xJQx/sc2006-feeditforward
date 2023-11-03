from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

import services.food as food_services
import schemas.food as food_schemas

router = APIRouter(prefix="/food")
