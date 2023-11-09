from sqlalchemy.orm import Session
from fastapi import HTTPException

import schemas.customer_service_support_history as css_history_schemas
from models.customer_service_support_history import CustomerServiceSupportHistory
from models.user import User

def get_customer_service_support_history_by_id(db: Session, css_history_id: int):
    db_customer_service_support_history = db.query(CustomerServiceSupportHistory).filter(CustomerServiceSupportHistory.css_history_id == css_history_id).first()
    
    return db_customer_service_support_history

def get_customer_service_support_history_by_admin_id(db: Session, admin_id: int):
    db_customer_service_support_history = db.query(CustomerServiceSupportHistory).filter(CustomerServiceSupportHistory.admin_id == admin_id).first()
    
    return db_customer_service_support_history

def get_all_customer_service_support_histories(db: Session, skip: int = 0, limit: int = 100):
    db_customer_service_support_histories = db.query(CustomerServiceSupportHistory).offset(skip).limit(limit).all()

    return db_customer_service_support_histories

def create_customer_service_support_history(db: Session, css_history: css_history_schemas.CustomerServiceSupportHistoryCreate):
    db_admin_user = db.query(User).filter(User.user_id == css_history.admin_id).first()
    if not db_admin_user:
        raise HTTPException(status_code=400, detail="Invalid admin_user_id")
    
    db_user = db.query(User).filter(User.user_id == css_history.user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid user_id")
    
    db_css_history = db.query(CustomerServiceSupportHistory).filter(
        CustomerServiceSupportHistory.admin_id == css_history.admin_id and
        CustomerServiceSupportHistory.user_id == css_history.user_id
    ).first()
    if db_css_history:
        raise HTTPException(status_code=400, detail="The Admin and User Pair already has an existing chat.")

    db_customer_service_support_history = CustomerServiceSupportHistory(
        admin_id=css_history.admin_id,
        user_id=css_history.user_id,
    )
    
    db.add(db_customer_service_support_history)
    db.commit()
    db.refresh(db_customer_service_support_history)

    return db_customer_service_support_history
