# este es el esquema que seguiremos para los restaurantes
from pydantic import BaseModel
from typing import Optional, List

class EstadoActivo(BaseModel):
    activo: bool

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
    descripcion: Optional[str] = None
    categorias: List[str] = []
    direccion: Direccion
    activo: bool = True

class RestauranteCrear(RestauranteBase):
    pass

class RestauranteLeer(RestauranteBase):
    id: str
    slug: Optional[str] = None
    calificacion: Optional[Calificacion] = None
    entrega: Optional[Entrega] = None

class RestauranteActualizar(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    categorias: Optional[List[str]] = None
    direccion: Optional[Direccion] = None
    entrega: Optional[Entrega] = None
    activo: Optional[bool] = None

class RestaurantesPorCategorias(BaseModel):
    categorias: List[str]
