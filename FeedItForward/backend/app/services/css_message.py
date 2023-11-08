from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime

import schemas.css_message as css_message_schemas
from models.css_message import CSSMessage
from models.user import User

def get_css_message_by_css_message_id(db: Session, css_message_id: int):
    db_css_message = db.query(CSSMessage).filter(CSSMessage.css_message_id == css_message_id).first()
    
    return db_css_message

def get_css_messages_by_css_history_id(db: Session, css_history_id: int):
    db_css_messages = db.query(CSSMessage).filter(CSSMessage.css_history_id == css_history_id)
    if not db_css_messages:
        raise HTTPException(status_code=400, detail="Invalid css_history_id")
    
    return db_css_messages

def get_all_css_messages(db: Session, skip: int = 0, limit: int = 100):
    db_css_messages = db.query(CSSMessage).offset(skip).limit(limit).all()

    return db_css_messages

def create_css_message(db: Session, css_message: css_message_schemas.CSSMessageCreate):
    db_sender_user = db.query(User).filter(User.user_id == css_message.sender_user_id).first()
    if not db_sender_user:
        raise HTTPException(status_code=400, detail="Invalid sender_user_id")
    
    db_receiver_user = db.query(User).filter(User.user_id == css_message.receiver_user_id).first()
    if not db_receiver_user:
        raise HTTPException(status_code=400, detail="Invalid receiver_user_id")

    db_css_message = CSSMessage(
        text=css_message.text,
        sender_user_id=css_message.sender_user_id,
        receiver_user_id=css_message.receiver_user_id,
        datetime=datetime.now(),
        css_history_id=css_message.css_history_id
    )
    
    db.add(db_css_message)
    db.commit()
    db.refresh(db_css_message)

    return db_css_message
