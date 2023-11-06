import json
from fastapi import HTTPException
from sqlalchemy.orm import Session

from .external_api import ExternalAPIController

import services.user as user_services
import schemas.user as user_schemas
import schemas.hawker as hawker_schemas

class UserController:
  # ----- User ----- #
  def getUserById(db: Session, user_id: int):
    user = user_services.get_user_by_id(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
  
  def getAllUsers(db: Session, skip: int, limit: int):
    users = user_services.get_all_users(db, skip=skip, limit=limit)
    return users

  # ----- Hawker ----- #
  def getAllHawkers(db: Session, skip: int, limit: int):
    # TODO
    # hawkers = hawker_services.get_all_hawkers(db, skip=skip, limit=limit)
    # return hawkers
    return None

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
          "user_id": "0",
          "name": "Public Hawker",
          "password": "-",
          "email": "-",
          "contact_number": "-",
          "address": address,
          "profile_picture":  hawker_json["properties"]["Description"]["PHOTOURL"],

          "role": "Hawker",
          "hawker_id": "0",
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
  
  def searchHawker(db: Session):
    # TODO
    return None
  
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
  def queryDirections(startLocation: str, endLocation: str):
    # TODO
    return None
  
  # ----- Review ----- #
  def flagReview(db: Session, review_id: int):
    # TODO
    return None