from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.customer_service_support import CustomerServiceSupportController
import schemas.customer_service_support_history as css_history_schemas
import schemas.css_message as css_message_schemas

router = APIRouter(prefix="/customer-service-support")

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
@router.get("/all-chats", response_model=list[css_history_schemas.CustomerServiceSupportHistory])
def get_all_chats(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getAllChats(db, skip, limit)

@router.post("/chat/new", response_model=css_history_schemas.CustomerServiceSupportHistory)
def create_customer_service_support(css_history: css_history_schemas.CustomerServiceSupportHistoryCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.startChat(db, css_history)

@router.get('/chat/{css_history_id}/messages', response_model=list[css_message_schemas.CSSMessage])
async def get_chat_messages(css_history_id: int, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getChatMessages(db, css_history_id=css_history_id)

@router.post("/chat/{css_history_id}/message/new", response_model=css_message_schemas.CSSMessage)
def create_customer_service_support(css_history_id: int, css_message: css_message_schemas.CSSMessageCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.sendMessage(db, css_message)

# ------------------------------------------------------------ #
# -------------------- CSS History (CRUD) -------------------- #
# ------------------------------------------------------------ #
@router.get('/chat/info/{css_history_id}', response_model=css_history_schemas.CustomerServiceSupportHistory)
async def get_chat_messages(css_history_id: int, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getCustomerServiceSupportHistoryById(db, css_history_id=css_history_id)
