from fastapi import APIRouter

from controllers.user import UserController

router = APIRouter(prefix="/weather")

tags_metadata = [
    {
        "name": "Weather (External)",
        "description": "API Endpoints for getting External Weather API"
    },
]

# ------------------------------------------------------------ #
# -------------------- Weather (External) -------------------- #
# ------------------------------------------------------------ #
@router.get('/24-hour/{date}', tags=["Weather (External)"])
async def getWeatherForecast24Hr(date: str):
    return UserController.queryWeather(date, "24-hours");

@router.get('/4-day/{date}', tags=["Weather (External)"])
async def getWeatherForecast4Day(date: str):
    return UserController.queryWeather(date, "4-days");
