from pydantic import BaseModel

from .user import User, UserCreate, UserUpdate, Role

class Admin(BaseModel):
    admin_id: int
    
    user_id: int
    user: User

    class Config:
        orm_mode = True

class AdminCreate(UserCreate):
    role: Role = Role.ADMIM
    pass

class AdminUpdate(UserUpdate):
    admin_id: int
    pass