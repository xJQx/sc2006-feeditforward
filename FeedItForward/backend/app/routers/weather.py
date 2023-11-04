from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controllers.external_api import ExternalAPIController

from database import get_db

router = APIRouter(prefix="/weather")

@router.get('/24-hour/{date}')
async def getWeatherForecast24Hr(date: str):
    weatherForecast = ExternalAPIController.getWeatherForecast24Hr(date)
    if weatherForecast is None:
        raise HTTPException(status_code=404, detail="24 Hour Weather Forecast not available")
    return weatherForecast

@router.get('/4-day/{date}')
async def getWeatherForecast4Day(date: str):
    weatherForecast = ExternalAPIController.getWeatherForecast4Day(date)
    if weatherForecast is None:
        raise HTTPException(status_code=404, detail="4 Day Weather Forecast not available")
    return weatherForecast
