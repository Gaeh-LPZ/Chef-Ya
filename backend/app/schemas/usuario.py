from typing import List, Optional
from pydantic import BaseModel


class GeoUsuario(BaseModel):
    lat: float
    lng: float


class DireccionUsuario(BaseModel):
    etiqueta: str
    calle: str
    ciudad: str
    estado: str
    cp: Optional[str] = None
    geo: GeoUsuario


class UsuarioBase(BaseModel):
    nombre: str
    correo: str
    telefono: Optional[str] = None
    direcciones: List[DireccionUsuario] = []


class UsuarioLeer(UsuarioBase):
    id: str
    googleId: str
