# este es el esquema que seguiremos para los restaurantes
from pydantic import BaseModel
from typing import Optional, List

class Geo(BaseModel):
    lat: float
    lng: float

class Direccion(BaseModel):
    calle: str
    ciudad: str
    estado: str
    cp: Optional[str] = None
    geo: Geo

class Calificacion(BaseModel):
    promedio: float
    conteo: int

class Entrega(BaseModel):
    minutosPromedio: int
    tarifa: float

class RestauranteBase(BaseModel):
    nombre: str
    slug: str
    descripcion: Optional[str] = None
    categorias: List[str] = []
    direccion: Direccion
    activo: bool = True

class RestauranteCrear(RestauranteBase):
    pass

class RestauranteLeer(RestauranteBase):
    id: str
    calificacion: Optional[Calificacion] = None
    entrega: Optional[Entrega] = None
