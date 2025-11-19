# schemas/carrito.py
from typing import List, Optional
from pydantic import BaseModel


class CarritoItemBase(BaseModel):
    restauranteId: str
    productoId: str
    nombre: str
    precio: float
    cantidad: int


class CarritoItemCrear(CarritoItemBase):
    pass


class CarritoItemLeer(CarritoItemBase):
    subtotal: float


class CuponAplicado(BaseModel):
    codigo: str
    descuento: float


class CarritoLeer(BaseModel):
    id: str
    usuarioId: str
    items: List[CarritoItemLeer]
    cuponAplicado: Optional[CuponAplicado] = None
    moneda: str
    subtotal: float
    tarifaEnvio: float
    total: float


class CarritoActualizarItem(BaseModel):
    cantidad: int


class CarritoAplicarCuponRequest(BaseModel):
    codigo: str
