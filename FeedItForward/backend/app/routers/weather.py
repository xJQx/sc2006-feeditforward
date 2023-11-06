from fastapi import APIRouter

from controllers.user import UserController

router = APIRouter(prefix="/weather")

@router.get('/24-hour/{date}')
async def getWeatherForecast24Hr(date: str):
    return UserController.queryWeather(date, "24-hours");

@router.get('/4-day/{date}')
async def getWeatherForecast4Day(date: str):
    return UserController.queryWeather(date, "4-days");
