from typing import Literal

from pydantic import BaseModel

class Geometry(BaseModel):
    type: Literal["Point"]
    latitude: float
    longitude: float
