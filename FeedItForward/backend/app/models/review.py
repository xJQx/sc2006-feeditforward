from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped

from database import Base

class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('consumers.consumer_id'))
    description = Column(String)
    rating = Column(Integer)
    photos = Column(String)
    flagged = Column(Boolean)
    flagged_reason = Column(String)

    consumer: Mapped["Consumer"] = relationship("Consumer", back_populates="reviews")
