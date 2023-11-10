from sqlalchemy import event

from .seed_data import DATABASE_SEED_DATA

from models.user import User
from models.admin import Admin
from models.consumer import Consumer
from models.driver import Driver
from models.hawker import Hawker
from models.review import Review
from models.leftover_food import LeftoverFood
from models.pickup_job import PickupJob
from models.priority_request import PriorityRequest
from models.notification import Notification
from models.customer_service_support_history import CustomerServiceSupportHistory
from models.css_message import CSSMessage

# This method receives a table, a connection and inserts data to that table.
def seed_table(target, connection, **kw):
    tablename = str(target)
    if tablename in DATABASE_SEED_DATA and len(DATABASE_SEED_DATA[tablename]) > 0:
        connection.execute(target.insert(), DATABASE_SEED_DATA[tablename])

def add_event_listener_to_seed_database():
  event.listen(User.__table__, 'after_create', seed_table)
  event.listen(Admin.__table__, 'after_create', seed_table)
  event.listen(Consumer.__table__, 'after_create', seed_table)
  event.listen(Hawker.__table__, 'after_create', seed_table)
  event.listen(Driver.__table__, 'after_create', seed_table)
  
  event.listen(Review.__table__, 'after_create', seed_table)
  event.listen(LeftoverFood.__table__, 'after_create', seed_table)
  
  event.listen(PriorityRequest.__table__, 'after_create', seed_table)
  event.listen(Notification.__table__, 'after_create', seed_table)
