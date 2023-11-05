from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class PickupJob(Base):
    __tablename__ = "pickup_jobs"

    pickup_job_id = Column(Integer, primary_key=True, index=True)
    consumer_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    driver_id = Column(Integer, ForeignKey('drivers.consumer_id'))

    startLocation: Column(String)
    endLocation: Column(String)

    food: Mapped["LeftoverFood"] = relationship("LeftoverFood", back_populates="pickup_jobs")
    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="reviews")
