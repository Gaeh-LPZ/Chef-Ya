from __future__ import annotations
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


# ----- Sub-esquemas -----

class PedidoItem(BaseModel):
    productoId: str = Field(..., description="ID del producto (ObjectId en string)")
    nombre: str
    precio: float
    cantidad: int
    subtotal: float


class DireccionEntrega(BaseModel):
    etiqueta: Optional[str] = None
    calle: str
    ciudad: str
    estado: str
    cp: Optional[str] = None


class CuponPedido(BaseModel):
    codigo: str
    descuento: float


class MontosPedido(BaseModel):
    subtotal: float
    tarifaEnvio: float
    total: float


class EventoEstadoPedido(BaseModel):
    estado: str
    en: datetime


class PagoPedido(BaseModel):
    modo: str = Field(..., description="simulado, stripe, etc.")
    estado: str = Field(..., description="pendiente, autorizado, pagado, rechazado, etc.")
    referencia: Optional[str] = Field(
        default=None,
        description="Referencia del pago (id de Stripe, código simulado, etc.)",
    )


# ----- Modelos principales -----

class PedidoBase(BaseModel):
    usuarioId: str = Field(..., description="ID del usuario (ObjectId en string)")
    restauranteId: str = Field(..., description="ID del restaurante (ObjectId en string)")
    items: List[PedidoItem]
    direccionEntrega: DireccionEntrega
    cupon: Optional[CuponPedido] = None
    montos: MontosPedido


class PedidoCrear(PedidoBase):
    """
    Datos necesarios para crear un pedido.
    Normalmente lo construirás a partir de un carrito.
    """
    pago: Optional[PagoPedido] = None


class PedidoCambiarEstado(BaseModel):
    estado: str = Field(..., description="Nuevo estado del pedido (ej. recibido, preparando, enviado, entregado)")


class PedidoLeer(PedidoBase):
    id: str = Field(..., description="ID del pedido (ObjectId en string)")
    folio: str
    estado: str
    realizadoEn: datetime
    cronologia: List[EventoEstadoPedido]
    pago: Optional[PagoPedido] = None
    creadoEn: datetime
    actualizadoEn: datetime

    class Config:
        from_attributes = True
