from typing import List, Optional
from pydantic import BaseModel, EmailStr


class GeoUsuario(BaseModel):
    lat: float
    lng: float


class DireccionUsuarioBase(BaseModel):
    etiqueta: str
    calle: str
    ciudad: str
    estado: str
    cp: Optional[str] = None
    geo: GeoUsuario


class DireccionUsuarioCrear(DireccionUsuarioBase):
    pass


class DireccionUsuarioLeer(DireccionUsuarioBase):
    pass


class UsuarioBase(BaseModel):
    nombre: str
    correo: EmailStr
    telefono: Optional[str] = None
    direcciones: List[DireccionUsuarioLeer] = []


class UsuarioLeer(UsuarioBase):
    id: str
    googleId: str


class UsuarioActualizar(BaseModel):
    nombre: Optional[str] = None
    telefono: Optional[str] = None

class UsuarioCrear(BaseModel):
    googleId: str
    nombre: str
    correo: EmailStr
    telefono: Optional[str] = None
    direcciones: List[DireccionUsuarioCrear] = []