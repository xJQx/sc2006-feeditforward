from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base
from schemas.priority_request import PriorityRequestStatusEnum, PriorityRequestHouseCategory

class PriorityRequest(Base):
    __tablename__ = "priority_requests"

    priority_request_id = Column(Integer, primary_key=True, index=True)

    household_income = Column(String)
    number_of_residents = Column(Integer)
    occupation = Column(String)
    house_category = Column(Enum(PriorityRequestHouseCategory))
    status = Column(Enum(PriorityRequestStatusEnum))
    
    date_created = Column(String)
    date_updated = Column(String)

    consumer_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="priority_requests")
