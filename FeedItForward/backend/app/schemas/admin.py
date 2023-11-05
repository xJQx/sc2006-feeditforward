from .user import User, UserCreate

class AdminCreate(UserCreate):
    pass

class Admin(User):
    admin_id: int

    class Config:
        orm_mode = True
