from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.customer_service_support_history as css_history_services
import schemas.customer_service_support_history as css_history_schemas
import services.css_message as css_message_services
import schemas.css_message as css_message_schemas

class CustomerServiceSupportController:
    # -------------------------------------------------------- #
    # -------------------- Business Logic -------------------- #
    # -------------------------------------------------------- #
    def getAllChats(db: Session, skip: int, limit: int):
        chats = css_history_services.get_all_customer_service_support_histories(db, skip=skip, limit=limit)
        return chats

    def startChat(db: Session, css_history: css_history_schemas.CustomerServiceSupportHistoryCreate):
        db_css_history = css_history_services.create_customer_service_support_history(db, css_history=css_history);
        return db_css_history
    
    def getChatMessages(db: Session, css_history_id: int):
        messages = css_message_services.get_css_messages_by_css_history_id(db, css_history_id=css_history_id)
        
        return messages
    
    def sendMessage(db: Session, css_message: css_message_schemas.CSSMessageCreate):
        db_css_message = css_message_services.create_css_message(db, css_message=css_message);
        if db_css_message is None:
            raise HTTPException(status_code=400, detail="CSSMessage cannot be created")
        return db_css_message

    # ------------------------------------------------------------ #
    # -------------------- CSS History (CRUD) -------------------- #
    # ------------------------------------------------------------ #
    def getCustomerServiceSupportHistoryById(db: Session, css_history_id: int):
        customer_service_support_history = css_history_services.get_customer_service_support_history_by_id(db, css_history_id=css_history_id)
        if customer_service_support_history is None:
            raise HTTPException(status_code=404, detail="CustomerServiceSupport not found")
        return customer_service_support_history

    