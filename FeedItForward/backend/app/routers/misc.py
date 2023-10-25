from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

import app.services.misc as misc_services
import app.schemas.misc as misc_schemas

router = APIRouter(prefix="/misc")
