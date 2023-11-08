from sqlalchemy.orm import Session

import services.user as user_services
import schemas.admin as admin_schemas
import schemas.user as user_schemas
from models.admin import Admin
from models.user import User

def get_admin_by_user_id(db: Session, user_id: int):
    return db.query(Admin).filter(Admin.user_id == user_id).first()

def get_admin_by_admin_id(db: Session, admin_id: int):
    return db.query(Admin).filter(Admin.admin_id == admin_id).first()

def get_all_admins(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Admin).offset(skip).limit(limit).all()

def create_admin(db: Session, user: admin_schemas.AdminCreate):
    user_to_create = user_schemas.UserCreate(
        name=user.name,
        email=user.email,
        contact_number=user.contact_number,
        address=user.address,
        password=user.password,
        role=user_schemas.Role.ADMIM
    )
    db_user = user_services.create_user(db, user_to_create)
    
    if not db_user:
        return None

    db_admin = Admin(user_id=db_user.user_id, admin_id=db_user.user_id)
    
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

def update_admin(db: Session, updated_admin: admin_schemas.AdminUpdate):
    db_user = db.query(User).filter(User.user_id == updated_admin.user_id).first()
    db_admin = db.query(Admin).filter(Admin.admin_id == updated_admin.admin_id).first()
    if not db_user or not db_admin:
        return None
    
    # Update User
    updated_user_data = updated_admin.model_dump(exclude_unset=True)
    for key, value in updated_user_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Update Admin
    updated_admin_data = updated_admin.model_dump(exclude_unset=True)
    for key, value in updated_admin_data.items():
        setattr(db_admin, key, value)
    
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin
