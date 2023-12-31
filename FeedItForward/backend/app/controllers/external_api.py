import httpx
import json
from datetime import datetime, time
from fastapi import HTTPException

from schemas.misc import Geometry

class ExternalAPIController:
  def getWeatherForecast24Hr(date: str):
    '''
    @param date: YYYY-MM-DD
    '''
    # weatherApi for new day only updates after 6am in the morning. So `day-1` to get the latest weather forecast
    if datetime.now().time() < time(6,0,0):
      day = int(date[8:])
      date = date[:8] + "{0:02d}".format(day-1)

    weatherApi = "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date={0}".format(date)

    with httpx.Client() as client:
      res = client.get(weatherApi)
      weather_raw_json = json.loads(res.text)

      # parse data
      latest_weather_json = weather_raw_json["items"][-1]
      periods = latest_weather_json["periods"]
      for period in periods:
        start_datetime = datetime.fromisoformat(period["time"]["start"])
        end_datetime = datetime.fromisoformat(period["time"]["end"])
        period["time"]["startDate"] = start_datetime.date()
        period["time"]["start"] = start_datetime.time()
        period["time"]["endDate"] = end_datetime.date()
        period["time"]["end"] = end_datetime.time()

      weather_data = {
        "lastUpdated": latest_weather_json["update_timestamp"],
        "generalForecast": latest_weather_json["general"]["forecast"],
        "periods": periods
      }

      if weather_data is None:
        raise HTTPException(status_code=404, detail="24 Hour Weather Forecast not available")

      return weather_data

  def getWeatherForecast4Day(date: str):
    '''
    @param date: YYYY-MM-DD
    '''
    # weatherApi for new day only updates after 6am in the morning. So `day-1` to get the latest weather forecast
    if datetime.now().time() < time(6,0,0):
      day = int(date[8:])
      date = date[:8] + "{0:02d}".format(day-1)
    
    weatherApi = "https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date={0}".format(date)

    with httpx.Client() as client:
      res = client.get(weatherApi)
      weather_raw_json = json.loads(res.text)

      # parse data
      latest_weather_json = weather_raw_json["items"][-1]

      weather_data_4_day = {
        "lastUpdated": latest_weather_json["update_timestamp"],
        "periods": [
          { 
            "date": datetime.fromisoformat(latest_weather_json["forecasts"][0]["date"]).date(),
            "forecast": latest_weather_json["forecasts"][0]["forecast"]
          },
          { 
            "date": datetime.fromisoformat(latest_weather_json["forecasts"][1]["date"]).date(),
            "forecast": latest_weather_json["forecasts"][1]["forecast"]
          },
          { 
            "date": datetime.fromisoformat(latest_weather_json["forecasts"][2]["date"]).date(),
            "forecast": latest_weather_json["forecasts"][2]["forecast"]
          },
          { 
            "date": datetime.fromisoformat(latest_weather_json["forecasts"][3]["date"]).date(),
            "forecast": latest_weather_json["forecasts"][3]["forecast"]
          },
        ]
      }

      if weather_data_4_day is None:
        raise HTTPException(status_code=404, detail="4 Day Weather Forecast not available")

      return weather_data_4_day
    
  def geoCoding(postal_code: str):
    oneMapApi = "https://developers.onemap.sg/commonapi/search?searchVal={0}&returnGeom=Y&getAddrDetails=Y".format(postal_code)

    with httpx.Client() as client:
      res = client.get(oneMapApi)
      geoCoded_location_json = json.loads(res.text)

      # parse data
      if geoCoded_location_json and geoCoded_location_json["found"] > 0:
        latitude = geoCoded_location_json["results"][0]["LATITUDE"]
        longitude = geoCoded_location_json["results"][0]["LONGITUDE"]

        geometry: Geometry = {
          "type": "Point",
          "latitude": latitude,
          "longitude": longitude
        }

        return geometry

      raise HTTPException(status_code=400, detail="Invalid Postal Code")
