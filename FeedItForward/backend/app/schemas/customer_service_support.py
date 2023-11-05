from pydantic import BaseModel

class CustomerServiceSupportHistory(BaseModel):
    user_id: int
    admin_id: int
    text_history: str