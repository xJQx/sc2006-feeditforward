from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, user, admin, consumer, driver, hawker, review, leftover_food, pickup_job, priority_request, notification, customer_service_support, external_api, file
from database import Base, engine
from assets.database_seed.helper import add_event_listener_to_seed_database

# Seed database
# Uncomment the line below if you want to seed the database
# add_event_listener_to_seed_database()

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(admin.router)
app.include_router(consumer.router)
app.include_router(driver.router)
app.include_router(hawker.router)
app.include_router(review.router)
app.include_router(leftover_food.router)
app.include_router(pickup_job.router)
app.include_router(priority_request.router)
app.include_router(notification.router)
app.include_router(customer_service_support.router)
app.include_router(external_api.router)
app.include_router(file.router)

@app.get("/")
def read_root():
    return {"API Docs": "http://127.0.0.1:8000/docs#/"}

# Web Socket
from websocket import WebSocketConnectionManager
web_socket_manager = WebSocketConnectionManager()

from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session

from websocket import process_websocket_endpoint

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int, db: Session=Depends(get_db)):
    await web_socket_manager.connect(websocket)
    await process_websocket_endpoint(web_socket_manager, websocket, client_id, db)
