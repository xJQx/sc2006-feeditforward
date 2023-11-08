from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from controllers.priority_request import PriorityRequestController
import schemas.priority_request as priority_request_schemas

router = APIRouter()

@router.get("/priority-requests", response_model=list[priority_request_schemas.PriorityRequest])
def get_all_priority_requests(skip: int = 0,
                  limit: int = 100,
                  db: Session = Depends(get_db)):
    return PriorityRequestController.getAllPriorityRequests(db, skip, limit)

@router.get('/priority-request/{priority_request_id}', response_model=priority_request_schemas.PriorityRequest)
async def get_priority_request_by_priority_request_id(priority_request_id: str, db: Session = Depends(get_db)):
    return PriorityRequestController.getPriorityRequestByPriorityRequestId(db, priority_request_id)

@router.get('/priority-requests/consumerid/{consumer_id}', response_model=list[priority_request_schemas.PriorityRequest])
async def get_priority_requests_by_consumer_id(consumer_id: str, db: Session = Depends(get_db)):
    return PriorityRequestController.getPriorityRequestsByConsumerId(db, consumer_id)

@router.get('/priority-requests/status/{status}', response_model=list[priority_request_schemas.PriorityRequest])
async def get_priority_requests_by_status(status: priority_request_schemas.PriorityRequestStatusEnum, db: Session = Depends(get_db)):
    return PriorityRequestController.getPriorityRequestsByStatus(db, status)

@router.post("/priority-requests/new", response_model=priority_request_schemas.PriorityRequest)
def create_priority_request(priority_request: priority_request_schemas.PriorityRequestCreate, db: Session = Depends(get_db)):
    return PriorityRequestController.createPriorityRequest(db, priority_request)

@router.put("/priority-requests/update", response_model=priority_request_schemas.PriorityRequest)
def update_priority_request(priority_request: priority_request_schemas.PriorityRequestUpdate, db: Session = Depends(get_db)):
    return PriorityRequestController.updatePriorityRequest(db, priority_request)
