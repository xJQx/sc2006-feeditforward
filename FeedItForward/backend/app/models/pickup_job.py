from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped

from database import Base
from schemas.pickup_job import PickupJobStatus

class PickupJob(Base):
    __tablename__ = "pickup_jobs"

    pickup_job_id = Column(Integer, primary_key=True, index=True)

    start_location = Column(String)
    end_location = Column(String)
    description = Column(String)
    status = Column(Enum(PickupJobStatus))
    photo_proofs = Column(String)

    leftover_food_id = Column(Integer, ForeignKey('leftover_foods.leftover_food_id'))
    leftover_food: Mapped["LeftoverFood"] = relationship("LeftoverFood", back_populates="pickup_jobs")
    
    consumer_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="pickup_jobs")

    driver_id = Column(Integer, ForeignKey('drivers.driver_id'))
    driver: Mapped["Driver"] = relationship("Driver", back_populates="pickup_jobs")