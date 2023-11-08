from pydantic import BaseModel
from typing import Literal
from enum import Enum

from .consumer import Consumer

class PriorityRequestStatusEnum(Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"

class PriorityRequestHouseCategory(Enum):
    THREE_ROOM = "3 Room"
    FOUR_ROOM = "4 Room"
    FIVE_ROOM = "5 Room"
    EXECUTIVE_CONDO = "Executive Condo"
    CONDO = "Condo"
    LANDED = "Landed"
    PENTHOUSE = "PentHouse"
    OTHERS = "Others"

class PriorityRequest(BaseModel):
    priority_request_id: int
    
    household_income: str
    number_of_residents: int
    occupation: str
    house_category: PriorityRequestHouseCategory
    status: PriorityRequestStatusEnum
    
    date_created: str
    date_updated: str

    consumer_id: int
    consumer: Consumer

class PriorityRequestCreate(BaseModel):
    household_income: str
    number_of_residents: int
    occupation: str
    house_category: PriorityRequestHouseCategory
    
    consumer_id: int

class PriorityRequestUpdate(BaseModel):
    priority_request_id: int
    
    household_income: str
    number_of_residents: int
    occupation: str
    house_category: PriorityRequestHouseCategory
    status: PriorityRequestStatusEnum
