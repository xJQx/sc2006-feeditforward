from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

import services.misc as misc_services
import schemas.misc as misc_schemas

router = APIRouter(prefix="/misc")
