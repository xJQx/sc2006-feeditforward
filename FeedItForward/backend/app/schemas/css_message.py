from pydantic import BaseModel

class CSSMessage(BaseModel):
    css_message_id: int

    text: str
    sender_user_id: int
    receiver_user_id: int
    datetime: str

    css_history_id: int

class CSSMessageCreate(BaseModel):
    text: str
    sender_user_id: int
    receiver_user_id: int

    css_history_id: int
