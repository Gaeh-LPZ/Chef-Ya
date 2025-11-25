# backend/app/schemas/ubicacion.py
from pydantic import BaseModel
from typing import Optional

class UbicacionValidada(BaseModel):
    direccion_completa: str
    calle: Optional[str] = None
    ciudad: Optional[str] = None
    estado: Optional[str] = None
    cp: Optional[str] = None
    lat: float
    lon: float