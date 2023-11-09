from fastapi import APIRouter

from controllers.external_api import ExternalAPIController

router = APIRouter()

tags_metadata = [
    {
        "name": "External APIs",
        "description": "API Endpoints for accessing External APIs such as Weather API and OneMap API"
    },
]

# ------------------------------------------------------------ #
# -------------------- External APIs ------------------------- #
# ------------------------------------------------------------ #
# ---------- Geocoding ---------- #
@router.get('/geo-coding/{postal_code}', tags=["External APIs"])
async def geo_coding(postal_code: str):
    return ExternalAPIController.geoCoding(postal_code);

# ---------- Weather ---------- #
@router.get('/weather/24-hour/{date}', tags=["External APIs"])
async def get_weather_forecast_24_Hr(date: str):
    return ExternalAPIController.getWeatherForecast24Hr(date);

@router.get('/weather/4-day/{date}', tags=["External APIs"])
async def get_weather_forecast_4_Day(date: str):
    return ExternalAPIController.getWeatherForecast4Day(date);
