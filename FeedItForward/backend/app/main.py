from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, user, admin, consumer, driver, food, misc, hawker, weather
from database import Base, engine

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
app.include_router(food.router)
app.include_router(misc.router)
app.include_router(hawker.router)
app.include_router(weather.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}