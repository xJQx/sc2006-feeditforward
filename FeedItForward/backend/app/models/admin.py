from sqlalchemy import Column, Integer, ForeignKey

from .user import User

class Admin(User):
    __tablename__ = "admins"

    admin_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)

    # css_history: Mapped[list["CustomerServiceSupportHistory"]] = relationship("CustomerServiceSupportHistory", back_populates="admin")
