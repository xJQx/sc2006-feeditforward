from fastapi import HTTPException
from sqlalchemy.orm import Session

import services.priority_request as priority_request_services
import schemas.priority_request as priority_request_schemas

class PriorityRequestController:
    # ----- PriorityRequest ----- #
    def getPriorityRequestByPriorityRequestId(db: Session, priority_request_id: int):
        priority_request = priority_request_services.get_priority_request_by_priority_request_id(db, priority_request_id=priority_request_id)
        if priority_request is None:
            raise HTTPException(status_code=404, detail="PriorityRequest not found")
        return priority_request

    def getPriorityRequestsByConsumerId(db: Session, consumer_id: int):
        priority_request = priority_request_services.get_priority_requests_by_consumer_id(db, consumer_id=consumer_id)
        if priority_request is None:
            raise HTTPException(status_code=404, detail="No priority_request found for queried consumer id")
        return priority_request
    
    def getPriorityRequestsByStatus(db: Session, status: priority_request_schemas.PriorityRequestStatusEnum):
        priority_requests = priority_request_services.get_priority_requests_by_status(db, status=status)
        if priority_requests is None:
            raise HTTPException(status_code=404, detail="No priority_request found for queried status")
        return priority_requests

    def getAllPriorityRequests(db: Session, skip: int, limit: int):
        priority_requests = priority_request_services.get_all_priority_requests(db, skip=skip, limit=limit)
        return priority_requests
    
    def createPriorityRequest(db: Session, priority_request: priority_request_schemas.PriorityRequestCreate):
        priority_request = priority_request_services.create_priority_request(db, priority_request);
        if priority_request is None:
            raise HTTPException(status_code=400, detail="PriorityRequest cannot be created")
        return priority_request
        
    def updatePriorityRequest(db: Session, updated_priority_request: priority_request_schemas.PriorityRequestUpdate):
        priority_request = priority_request_services.update_priority_request(db, updated_priority_request)
        if priority_request is None:
            raise HTTPException(status_code=404, detail="PriorityRequest not found")
        return priority_request
