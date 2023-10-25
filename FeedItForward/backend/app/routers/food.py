from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

import app.services.food as food_services
import app.schemas.food as food_schemas

router = APIRouter(prefix="/food")
