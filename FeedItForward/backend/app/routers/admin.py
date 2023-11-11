from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.admin import AdminController

import schemas.admin as admin_schemas
import schemas.user as user_schemas
import schemas.priority_request as priority_request_schemas
import schemas.notification as notification_schemas
import schemas.review as review_schemas
import schemas.misc as misc_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Admin Controller",
        "description": "API Endpoints for methods implemented by the Admin Controller"
    },
    {
        "name": "Admin (CRUD)",
        "description": "API CRUD Endpoints for Admin Model"
    },
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
@router.get('/admin-controller/ban-user/{user_id}', response_model=user_schemas.User, tags=["Admin Controller"])
async def ban_user(user_id: str, db: Session = Depends(get_db)):
    return AdminController.banUser(db, user_id)

@router.post('/admin-controller/verify-user/{user_id}', response_model=priority_request_schemas.PriorityRequestUpdate, tags=["Admin Controller"])
async def verify_user(reqeustBody: misc_schemas.AdminVerifyUserSchema, db: Session = Depends(get_db)):
    return AdminController.verifyUser(
        db,
        priority_request_id=reqeustBody.priority_request_id,
        admin_id=reqeustBody.admin_id,
        user_id=reqeustBody.user_id,
        action=reqeustBody.action
    )

@router.post('/admin-controller/notify-user', response_model=notification_schemas.Notification, tags=["Admin Controller"])
async def notify_user(notification: notification_schemas.NotificationCreate, db: Session = Depends(get_db)):
    return AdminController.notifyUser(db, notification=notification)

@router.post('/admin-controller/process-review/{review_id}', response_model=review_schemas.ReviewUpdate, tags=["Admin Controller"])
async def process_review(requestBody: misc_schemas.AdminProcessReviewSchema, db: Session = Depends(get_db)):
    return AdminController.processReview(db, action=requestBody.action, review_id=requestBody.review_id)

# ------------------------------------------------------------ #
# -------------------- Admin (CRUD) -------------------------- #
# ------------------------------------------------------------ #
@router.get("/admins", response_model=list[admin_schemas.Admin], tags=["Admin (CRUD)"])
def get_all_admins(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return AdminController.getAllAdmins(db, skip, limit)

@router.get('/admin/{admin_id}', response_model=admin_schemas.Admin, tags=["Admin (CRUD)"])
async def get_admin_by_admin_id(admin_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByAdminId(db, admin_id)

@router.get('/admin/userid/{user_id}', response_model=admin_schemas.Admin, tags=["Admin (CRUD)"])
async def get_admin_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByUserId(db, user_id)

@router.put("/admin/update", response_model=admin_schemas.Admin, tags=["Admin (CRUD)"])
def update_admin(admin: admin_schemas.AdminUpdate, db: Session = Depends(get_db)):
    return AdminController.updateAdmin(db, admin)
