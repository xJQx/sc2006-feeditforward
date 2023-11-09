
from abc import ABC, abstractmethod
from sqlalchemy import Engine, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

class DatabaseInterface(ABC):
    Base: type(declarative_base)
    SessionLocal: sessionmaker[Session]
    engine: Engine

    @abstractmethod
    def connect(self):
        pass

class SQLiteDatabase(DatabaseInterface):
    def __init__(self):
        self.engine = None
        self.SessionLocal = None
        self.Base = None

    def connect(self):
        SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

        self.engine = create_engine(
            SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
        )
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()

class PostgresSQLDatabase(DatabaseInterface):
    def __init__(self):
        self.engine = None
        self.SessionLocal = None
        self.Base = None

    def connect(self):
        SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

        self.engine = create_engine(SQLALCHEMY_DATABASE_URL)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()

class DatabaseFactory:
    @staticmethod
    def getDatabase(type: str) -> DatabaseInterface:
        '''
        @param `type`: "sqlite", or "postgresql"
        '''
        match type:
            case 'sqlite':
                return SQLiteDatabase()
            case 'postgresql':
                return PostgresSQLDatabase()
            case _:
                return SQLiteDatabase() # default
