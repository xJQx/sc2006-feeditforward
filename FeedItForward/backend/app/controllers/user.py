import json

from schemas.user import Hawker

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
          "userId": "0",
          "name": "Public Hawker",
          "password": "-",
          "email": "-",
          "contactNumber": "-",
          "address": address,
          "img": {
            "src": hawker_json["properties"]["Description"]["PHOTOURL"],
            "alt": "photo of hawker center"
          },

          "role": "Hawker",
          "hawkerId": "0",
          "overallRating": 5.0,
          "businessName": hawker_json["properties"]["Description"]["NAME"],
          "operatingHours": "Unknown",
          "foodType": "Unknown Food Type",
          "geometry": {
            "type": hawker_json["properties"]["geometry"]["type"],
            "latitude": hawker_json["properties"]["geometry"]["coordinates"][1],
            "longitude": hawker_json["properties"]["geometry"]["coordinates"][0],
          },
          "isRegistered": False
        }
        publicHawkers.append(hawker)
      
      return publicHawkers
  