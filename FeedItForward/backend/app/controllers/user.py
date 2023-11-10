import json
from fastapi import HTTPException
from sqlalchemy.orm import Session

from .external_api import ExternalAPIController

import services.user as user_services
import services.hawker as hawker_services
import services.review as review_services
import services.notification as notification_services

import schemas.user as user_schemas
import schemas.hawker as hawker_schemas
import schemas.review as review_schemas

class UserController:
  # -------------------------------------------------------- #
  # -------------------- Business Logic -------------------- #
  # -------------------------------------------------------- #
  # ----- User ----- #
  def getAllUsers(db: Session, skip: int, limit: int):
    users = user_services.get_all_users(db, skip=skip, limit=limit)
    return users
  
  def getUserById(db: Session, user_id: int):
    user = user_services.get_user_by_id(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
  
  # ----- Hawker ----- #
  def getAllHawkers(db: Session, skip: int, limit: int):
    return hawker_services.get_all_hawkers(db, skip=skip, limit=limit)

  def getAllPublicHawkers():
    with open("assets/data/HawkerCentresGEOJSON.geojson") as geojson_file:
      raw_json = json.loads(geojson_file.read())

      # Parse data
      publicHawkers: list[hawker_schemas.Hawker] = []
      for hawker_json in raw_json["features"]:
        address = hawker_json["properties"]["Description"]["ADDRESSBUILDINGNAME"] + " " +\
          hawker_json["properties"]["Description"]["ADDRESSBUILDINGNAME"] + " " +\
          hawker_json["properties"]["Description"]["ADDRESSPOSTALCODE"]
        
        hawker: hawker_schemas.Hawker = {
          "user_id": 0,
          "user": {
            "user_id": 0,
            "name": "Public Hawker",
            "password": "-",
            "email": "-",
            "contact_number": "-",
            "address": address,
            "profile_picture":  hawker_json["properties"]["Description"]["PHOTOURL"],
            "role": user_schemas.Role.HAWKER,
          },

          "hawker_id": 0,
          "overall_rating": 5.0,
          "business_name": hawker_json["properties"]["Description"]["NAME"],
          "operating_hours": "Unknown",
          "food_type": "Unknown Food Type",
          "geometry": {
            "type": hawker_json["properties"]["geometry"]["type"],
            "latitude": hawker_json["properties"]["geometry"]["coordinates"][1],
            "longitude": hawker_json["properties"]["geometry"]["coordinates"][0],
          },
          "is_registered": False
        }
        publicHawkers.append(hawker)
      
      return publicHawkers
  
  def searchHawker(db: Session, skip: int, limit: int, search_value: str):
    ''' Searches Hawkers by `business_name`'''
    hawkers = hawker_services.get_all_hawkers(db, skip=skip, limit=limit)
    hawkers_filtered = filter(lambda x: search_value in x.business_name, hawkers)
    return hawkers_filtered
  
  # ----- Weather ----- #
  def queryWeather(date: str, period: str):
    '''
    @param `date`: YYYY-YMM-DD
    @param `period`: `24-hours` or `4-days`
    '''
    match period:
      case '24-hours':
        return ExternalAPIController.getWeatherForecast24Hr(date)
      case '4-days':
        return ExternalAPIController.getWeatherForecast4Day(date)
      case _:
        raise HTTPException(status_code=400, detail="Queried period not found")
  
  # ----- Directions ----- #
  def queryDirections(start_location: str, end_location: str):
    # TODO
    return None
  
  # ----- Review ----- #
  def flagReview(db: Session, review_id: int, flagged_reason: str):
    db_review = review_services.get_review_by_review_id(db, review_id=review_id)
    updated_review = review_schemas.ReviewUpdate(
      review_id=db_review.review_id,
      consumer_id=db_review.consumer_id,
      description=db_review.description,
      photos=db_review.photos,
      rating=db_review.rating,
      flagged=True,
      flagged_reason=flagged_reason
    )
    return review_services.update_review(db, updated_review)
  
  # ----- Notification ----- #
  def getUserNotifications(db: Session, user_id: int):
    return notification_services.get_notifications_by_receiver_user_id(db, receiver_user_id=user_id)


  # ------------------------------------------------------------ #
  # -------------------- User (CRUD) --------------------------- #
  # ------------------------------------------------------------ #
  def getUserByEmail(db: Session, email: str):
    user = user_services.get_user_by_email(db, email=email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
  
  def updateUser(db: Session, updated_user: user_schemas.UserUpdate):
    user = user_services.update_user(db, updated_user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
