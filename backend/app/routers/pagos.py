from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd  # ajusta el import según tu proyecto

from schemas.pago import (
    PagoSimuladoRequest,
    PagoStripeCheckoutRequest,
    PagoStripeCheckoutResponse,
)
from schemas.pedido import PedidoLeer
from services.pago_service import (
    pagar_simulado_servicio,
    crear_sesion_stripe_checkout_servicio,
)

router = APIRouter(
    prefix="/pagos",
    tags=["Pagos"],
)


@router.post(
    "/simulado",
    response_model=PedidoLeer,
    status_code=status.HTTP_201_CREATED,
    summary="Pagar carrito con modo simulado y crear pedido",
)
async def pagar_simulado_endpoint(
    datos: PagoSimuladoRequest,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> PedidoLeer:
    pedido = await pagar_simulado_servicio(bd, datos)
    if not pedido:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo crear el pedido a partir del carrito.",
        )
    return pedido


@router.post(
    "/stripe/checkout",
    response_model=PagoStripeCheckoutResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear sesión de Stripe Checkout para un carrito",
    description=(
        "Crea una sesión de Stripe Checkout a partir del carrito. "
        "Devuelve la URL para redirigir al usuario."
    ),
)
async def crear_sesion_stripe_checkout_endpoint(
    datos: PagoStripeCheckoutRequest,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> PagoStripeCheckoutResponse:
    resp = await crear_sesion_stripe_checkout_servicio(bd, datos)
    if not resp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo crear la sesión de Stripe Checkout.",
        )
    return resp
