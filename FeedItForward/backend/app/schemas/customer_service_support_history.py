from pydantic import BaseModel
from typing import Optional

from .css_message import CSSMessage
from .admin import Admin

class CustomerServiceSupportHistory(BaseModel):
    css_history_id: int

    messages: Optional[list[CSSMessage]] = []

    admin_id: int
    admin: Admin

    user_id: int

class CustomerServiceSupportHistoryCreate(BaseModel):
    admin_id: int
    user_id: int
