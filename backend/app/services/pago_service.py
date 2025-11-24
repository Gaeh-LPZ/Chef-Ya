from __future__ import annotations

import os
from datetime import datetime
from typing import Optional

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from schemas.pedido import (
    PedidoCrear,
    PedidoLeer,
    PedidoItem,
    DireccionEntrega,
    CuponPedido,
    MontosPedido,
    PagoPedido,
)
from schemas.pago import (
    PagoSimuladoRequest,
    PagoStripeCheckoutRequest,
    PagoStripeCheckoutResponse,
)
from services.pedido_service import crear_pedido_servicio

# Nombre de colecciones en Mongo
COLECCION_CARRITOS = "carritos"
COLECCION_USUARIOS = "usuarios"

# Stripe
import stripe  # asegúrate de tener "stripe" en requirements.txt


def _configurar_stripe_desde_env() -> None:
    secret_key = os.getenv("STRIPE_SECRET_KEY")
    if not secret_key:
        raise RuntimeError(
            "STRIPE_SECRET_KEY no está definido en las variables de entorno."
        )
    stripe.api_key = secret_key


# ---------- Helpers internos comunes ----------


async def _obtener_carrito_doc(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
) -> Optional[dict]:
    try:
        oid = ObjectId(id_carrito)
    except Exception:
        return None

    return await bd[COLECCION_CARRITOS].find_one({"_id": oid})


async def _obtener_usuario_doc_por_oid(
    bd: AsyncIOMotorDatabase,
    usuario_oid: ObjectId,
) -> Optional[dict]:
    return await bd[COLECCION_USUARIOS].find_one({"_id": usuario_oid})


def _construir_direccion_entrega_desde_usuario(usuario_doc: dict) -> DireccionEntrega:
    direcciones = usuario_doc.get("direcciones", [])
    if direcciones:
        d = direcciones[0]  # primera dirección como por defecto
        return DireccionEntrega(
            etiqueta=d.get("etiqueta"),
            calle=d.get("calle", ""),
            ciudad=d.get("ciudad", ""),
            estado=d.get("estado", ""),
            cp=d.get("cp"),
        )
    # fallback mínimo si no tiene direcciones
    return DireccionEntrega(
        etiqueta=None,
        calle="",
        ciudad="",
        estado="",
        cp=None,
    )


def _construir_items_pedido_desde_carrito(carrito_doc: dict) -> list[PedidoItem]:
    items: list[PedidoItem] = []
    for item in carrito_doc.get("items", []):
        items.append(
            PedidoItem(
                productoId=str(item.get("productoId")),
                nombre=item.get("nombre", ""),
                precio=float(item.get("precio", 0)),
                cantidad=int(item.get("cantidad", 0)),
                subtotal=float(item.get("subtotal", 0)),
            )
        )
    return items


def _construir_montos_desde_carrito(carrito_doc: dict) -> MontosPedido:
    return MontosPedido(
        subtotal=float(carrito_doc.get("subtotal", 0)),
        tarifaEnvio=float(carrito_doc.get("tarifaEnvio", 0)),
        total=float(carrito_doc.get("total", 0)),
    )


def _construir_cupon_desde_carrito(carrito_doc: dict) -> Optional[CuponPedido]:
    cupon_doc = carrito_doc.get("cuponAplicado")
    if not cupon_doc:
        return None
    return CuponPedido(
        codigo=cupon_doc.get("codigo", ""),
        descuento=float(cupon_doc.get("descuento", 0)),
    )


# ---------- Pago simulado: crea Pedido directamente ----------


async def pagar_simulado_servicio(
    bd: AsyncIOMotorDatabase,
    datos: PagoSimuladoRequest,
) -> Optional[PedidoLeer]:
    carrito_doc = await _obtener_carrito_doc(bd, datos.carritoId)
    if not carrito_doc:
        return None

    usuario_oid = carrito_doc.get("usuarioId")
    if not isinstance(usuario_oid, ObjectId):
        return None

    usuario_doc = await _obtener_usuario_doc_por_oid(bd, usuario_oid)
    if not usuario_doc:
        return None

    # Construimos datos de pedido a partir del carrito + usuario
    direccion_entrega = _construir_direccion_entrega_desde_usuario(usuario_doc)
    items = _construir_items_pedido_desde_carrito(carrito_doc)
    montos = _construir_montos_desde_carrito(carrito_doc)
    cupon = _construir_cupon_desde_carrito(carrito_doc)

    # Asumimos que todos los items son del mismo restaurante (como en tu modelo)
    if not items:
        return None

    restaurante_oid = carrito_doc.get("items", [{}])[0].get("restauranteId")
    if not isinstance(restaurante_oid, ObjectId):
        return None

    pago = PagoPedido(
        modo="simulado",
        estado="autorizado",
        referencia=f"SIM-{int(datetime.utcnow().timestamp())}",
    )

    pedido_crear = PedidoCrear(
        usuarioId=str(usuario_oid),
        restauranteId=str(restaurante_oid),
        items=items,
        direccionEntrega=direccion_entrega,
        cupon=cupon,
        montos=montos,
        pago=pago,
    )

    pedido = await crear_pedido_servicio(bd, pedido_crear)
    return pedido


# ---------- Stripe Checkout: crea una sesión, NO un pedido (todavía) ----------


async def crear_sesion_stripe_checkout_servicio(
    bd: AsyncIOMotorDatabase,
    datos: PagoStripeCheckoutRequest,
) -> Optional[PagoStripeCheckoutResponse]:
    carrito_doc = await _obtener_carrito_doc(bd, datos.carritoId)
    if not carrito_doc:
        return None

    usuario_oid = carrito_doc.get("usuarioId")
    if not isinstance(usuario_oid, ObjectId):
        return None

    usuario_doc = await _obtener_usuario_doc_por_oid(bd, usuario_oid)
    if not usuario_doc:
        return None

    # Configurar Stripe
    _configurar_stripe_desde_env()

    # Obtener/crear customer en Stripe
    stripe_customer_id = usuario_doc.get("stripeCustomerId")
    if not stripe_customer_id:
        # Creamos un customer nuevo en Stripe
        customer = stripe.Customer.create(
            email=usuario_doc.get("correo"),
            name=usuario_doc.get("nombre"),
        )
        stripe_customer_id = customer.id

        # Guardamos stripeCustomerId en el usuario
        await bd[COLECCION_USUARIOS].update_one(
            {"_id": usuario_oid},
            {"$set": {"stripeCustomerId": stripe_customer_id}},
        )

    # Monto total del carrito en centavos (Stripe trabaja en centavos)
    total = float(carrito_doc.get("total", 0))
    if total <= 0:
        return None

    moneda = carrito_doc.get("moneda", "MXN").lower()  # ej. "mxn"

    # Creamos sesión de Checkout de Stripe
    session = stripe.checkout.Session.create(
        mode="payment",
        customer=stripe_customer_id,
        line_items=[
            {
                "price_data": {
                    "currency": moneda,
                    "product_data": {
                        "name": "Pedido ChefYa",
                    },
                    "unit_amount": int(total * 100),
                },
                "quantity": 1,
            }
        ],
        success_url=datos.successUrl,
        cancel_url=datos.cancelUrl,
        metadata={
            "carritoId": str(carrito_doc["_id"]),
            "usuarioId": str(usuario_oid),
        },
    )

    return PagoStripeCheckoutResponse(checkoutUrl=session.url)
