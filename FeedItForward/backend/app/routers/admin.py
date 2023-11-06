from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers.admin import AdminController

import schemas.admin as admin_schemas

router = APIRouter()

@router.get("/admins", response_model=list[admin_schemas.Admin])
def get_all_admins(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return AdminController.getAllAdmins(db, skip, limit)

@router.get('/admin/{admin_id}', response_model=admin_schemas.Admin)
async def get_admin_by_admin_id(admin_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByAdminId(db, admin_id)

@router.get('/admin/userid/{user_id}', response_model=admin_schemas.Admin)
async def get_admin_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return AdminController.getAdminByUserId(db, user_id)

@router.put("/admin/update", response_model=admin_schemas.Admin)
def update_admin(admin: admin_schemas.AdminUpdate, db: Session = Depends(get_db)):
    return AdminController.updateAdmin(db, admin)
