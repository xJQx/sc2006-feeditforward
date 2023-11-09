from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.customer_service_support import CustomerServiceSupportController
import schemas.customer_service_support_history as css_history_schemas
import schemas.css_message as css_message_schemas

router = APIRouter()

tags_metadata = [
    {
        "name": "Customer Service Support Controller",
        "description": "API Endpoints for methods implemented by the Customer Service Support Controller"
    },
    {
        "name": "Customer Service Support (CRUD)",
        "description": "API CRUD Endpoints for Customer Service Support Model"
    },
]

# -------------------------------------------------------- #
# -------------------- Business Logic -------------------- #
# -------------------------------------------------------- #
@router.get("/customer-service-support-controller/get-all-chats", response_model=list[css_history_schemas.CustomerServiceSupportHistory], tags=["Customer Service Support Controller"])
def get_all_chats(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getAllChats(db, skip, limit)

@router.post("/customer-service-support-controller/start-new-chat", response_model=css_history_schemas.CustomerServiceSupportHistory, tags=["Customer Service Support Controller"])
def start_new_chat(css_history: css_history_schemas.CustomerServiceSupportHistoryCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.startNewChat(db, css_history)

@router.get('/customer-service-support-controller/get-chat-messages/{css_history_id}', response_model=list[css_message_schemas.CSSMessage], tags=["Customer Service Support Controller"])
async def get_chat_messages(css_history_id: int, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getChatMessages(db, css_history_id=css_history_id)

@router.post("/customer-service-support-controller/chat/{css_history_id}/send-message", response_model=css_message_schemas.CSSMessage, tags=["Customer Service Support Controller"])
def send_message(css_history_id: int, css_message: css_message_schemas.CSSMessageCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.sendMessage(db, css_message)


# ------------------------------------------------------------------------ #
# -------------------- CSS History and Message (CRUD) -------------------- #
# ------------------------------------------------------------------------ #
@router.get("/customer-service-support/css-histories", response_model=list[css_history_schemas.CustomerServiceSupportHistory], tags=["Customer Service Support Controller (CRUD)"])
def get_all_css_histories(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getAllChats(db, skip, limit)

@router.get('/customer-service-support/css-history/{css_history_id}', response_model=css_history_schemas.CustomerServiceSupportHistory, tags=["Customer Service Support Controller (CRUD)"])
async def get_css_history_by_id(css_history_id: int, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getCustomerServiceSupportHistoryById(db, css_history_id=css_history_id)

@router.post("/customer-service-support/css-history/new", response_model=css_history_schemas.CustomerServiceSupportHistory, tags=["Customer Service Support Controller (CRUD)"])
def create_css_history(css_history: css_history_schemas.CustomerServiceSupportHistoryCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.startNewChat(db, css_history)

@router.get('/customer-service-support/chat/{css_history_id}/messages', response_model=list[css_message_schemas.CSSMessage], tags=["Customer Service Support Controller (CRUD)"])
async def get_css_messages(css_history_id: int, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.getChatMessages(db, css_history_id=css_history_id)

@router.post("/customer-service-support/chat/{css_history_id}/message/new", response_model=css_message_schemas.CSSMessage, tags=["Customer Service Support Controller (CRUD)"])
def create_css_message(css_history_id: int, css_message: css_message_schemas.CSSMessageCreate, db: Session = Depends(get_db)):
    return CustomerServiceSupportController.sendMessage(db, css_message)
