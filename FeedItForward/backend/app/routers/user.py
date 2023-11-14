from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from controllers.user import UserController

import schemas.user as user_schemas
import schemas.hawker as hawker_schemas
import schemas.review as review_schemas
import schemas.notification as notification_schemas
import schemas.misc as misc_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "User Controller",
        "description": "API Endpoints for methods implemented by the User Controller"
    },
    {
        "name": "User (CRUD)",
        "description": "API CRUD Endpoints for User Model"
    },
]


# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
# ---------- User ---------- #
@router.get("/user-controller/get-all-users", response_model=list[user_schemas.User], tags=["User Controller"])
def get_all_users(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return UserController.getAllUsers(db, skip, limit)

@router.get('/user-controller/get-user-by-id/{user_id}', response_model=user_schemas.User, tags=["User Controller"])
async def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    return UserController.getUserById(db, user_id)

# ---------- Hawker ---------- #
@router.get('/user-controller/get-all-public-hawkers', tags=["User Controller"])
async def get_all_public_hawkers():
    hawkersLocation = UserController.getAllPublicHawkers()
    if hawkersLocation is None:
        raise HTTPException(status_code=404, detail="Public Hawkers not found")
    return hawkersLocation

@router.get("/user-controller/get-all-hawkers", response_model=list[hawker_schemas.Hawker], tags=["User Controller"])
def get_all_hawkers(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return UserController.getAllHawkers(db, skip, limit)

@router.get("/hawkers/search/{business_name}", response_model=list[hawker_schemas.Hawker], tags=["User Controller"])
def search_hawker(business_name: str,
                  skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return UserController.searchHawker(db, skip, limit, search_value=business_name)

# ---------- Weather ---------- #
@router.get('/user-controller/query-weather/24-hour/{date}/{period}', tags=["User Controller"])
async def query_weather(date: str, period: str):
    match period:
        case "24-hour":
            return UserController.queryWeather(date, "24-hours");
        case "4-day":
            return UserController.queryWeather(date, "4-days");
        case _:
            return UserController.queryWeather(date, "24-hours");

# ---------- Review ---------- #
@router.put("/user-controller/flag-review", response_model=review_schemas.Review, tags=["User Controller"])
def flag_review(requestBody: misc_schemas.UserFlagReviewSchema, db: Session = Depends(get_db)):
    return UserController.flagReview(db, review_id=requestBody.review_id, flagged_reason=requestBody.flagged_reason)

# ---------- Notification ---------- #
@router.get("/user-controller/get-all-notifications/{user_id}", response_model=list[notification_schemas.Notification], tags=["User Controller"])
def get_all_notifications(user_id: int, db: Session = Depends(get_db)):
    return UserController.getUserNotifications(db, user_id)


# ------------------------------------------------------------ #
# -------------------- User (CRUD) --------------------------- #
# ------------------------------------------------------------ #
@router.get("/users", response_model=list[user_schemas.User], tags=["User (CRUD)"])
def get_all_users(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return UserController.getAllUsers(db, skip, limit)

@router.get('/user/{user_id}', response_model=user_schemas.User, tags=["User (CRUD)"])
async def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    return UserController.getUserById(db, user_id)

@router.get('/user/email/{email}', response_model=user_schemas.User, tags=["User (CRUD)"])
async def get_user_by_email(email: str, db: Session = Depends(get_db)):
    return UserController.getUserByEmail(db, email)

@router.put("/user/update", response_model=user_schemas.User, tags=["User (CRUD)"])
def update_user(user: user_schemas.UserUpdate, db: Session = Depends(get_db)):
    return UserController.updateUser(db, user)
