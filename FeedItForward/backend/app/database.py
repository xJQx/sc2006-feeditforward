from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from factory.database import DatabaseFactory

database = DatabaseFactory.getDatabase("sqlite")
database.connect() # connect to database

engine = database.engine
Base = database.Base
SessionLocal = database.SessionLocal

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
