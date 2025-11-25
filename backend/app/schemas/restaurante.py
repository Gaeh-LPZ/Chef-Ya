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


# 🔹 NUEVO: modelos para horario
class HorarioDia(BaseModel):
    abre: str  # formato "HH:MM"
    cierra: str  # formato "HH:MM"


class Horario(BaseModel):
    lunes: Optional[HorarioDia] = None
    martes: Optional[HorarioDia] = None
    miercoles: Optional[HorarioDia] = None
    jueves: Optional[HorarioDia] = None
    viernes: Optional[HorarioDia] = None
    sabado: Optional[HorarioDia] = None
    domingo: Optional[HorarioDia] = None


class RestauranteBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    categorias: List[str] = []
    imagen: Optional[str] = None
    imagen_banner: Optional[str] = None
    direccion: Direccion
    activo: bool = True

    # 🔹 NUEVO
    horario: Optional[Horario] = None
    diasServicio: Optional[List[str]] = None  # ["lunes", "martes", ...]
    url_localizacion: Optional[str] = None    # URL de Google Maps u otra


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
    imagen: Optional[str] = None
    imagen_banner: Optional[str] = None
    categorias: Optional[List[str]] = None
    direccion: Optional[Direccion] = None
    entrega: Optional[Entrega] = None
    activo: Optional[bool] = None

    # 🔹 NUEVO
    horario: Optional[Horario] = None
    diasServicio: Optional[List[str]] = None
    url_localizacion: Optional[str] = None


class RestaurantesPorCategorias(BaseModel):
    categorias: List[str]


# 🔹 NUEVO: esquema para devolver solo info de horario
class HorarioRestaurante(BaseModel):
    id: str
    nombre: str
    slug: Optional[str] = None
    horario: Optional[Horario] = None
    diasServicio: Optional[List[str]] = None
    url_localizacion: Optional[str] = None
