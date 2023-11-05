import json

from schemas.hawker import Hawker

class UserController:
  def getAllPublicHawkers():
    with open("assets/data/HawkerCentresGEOJSON.geojson") as geojson_file:
      raw_json = json.loads(geojson_file.read())

      # Parse data
      publicHawkers: list[Hawker] = []
      for hawker_json in raw_json["features"]:
        address = hawker_json["properties"]["Description"]["ADDRESSBUILDINGNAME"] + " " +\
          hawker_json["properties"]["Description"]["ADDRESSBUILDINGNAME"] + " " +\
          hawker_json["properties"]["Description"]["ADDRESSPOSTALCODE"]
        
        hawker: Hawker = {
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
  