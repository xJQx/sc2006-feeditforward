from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.admin as admin_services
import schemas.admin as admin_schemas

class AdminController:
  # ----- Admin ----- #
  def getAdminByUserId(db: Session, user_id: int):
    admin = admin_services.get_admin_by_user_id(db, user_id=user_id)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
  
  def getAdminByAdminId(db: Session, admin_id: int):
    admin = admin_services.get_admin_by_admin_id(db, admin_id=admin_id)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
  
  def getAllAdmins(db: Session, skip: int, limit: int):
    admins = admin_services.get_all_admins(db, skip=skip, limit=limit)
    return admins
  
  def updateAdmin(db: Session, updated_admin: admin_schemas.AdminUpdate):
    admin = admin_services.update_admin(db, updated_admin)
    if admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin
