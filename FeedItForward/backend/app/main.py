from typing import Union

from fastapi import FastAPI

from .routers import user, food, misc
from .database import Base, engine, get_db

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(food.router)
app.include_router(misc.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}