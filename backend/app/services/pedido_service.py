from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from schemas.pedido import (
    PedidoCrear,
    PedidoLeer,
    PedidoCambiarEstado,
    PedidoItem,
    DireccionEntrega,
    CuponPedido,
    MontosPedido,
    EventoEstadoPedido,
    PagoPedido,
)

NOMBRE_COLECCION_PEDIDOS = "pedidos"


# ----- Servicios públicos -----


async def crear_pedido_servicio(
    bd: AsyncIOMotorDatabase,
    datos_pedido: PedidoCrear,
    folio: Optional[str] = None,
) -> PedidoLeer:
    """
    Crea un nuevo pedido en la colección 'pedidos'.
    Más adelante aquí podrás integrar Stripe (modo 'stripe' en pago).
    """
    ahora = datetime.utcnow()

    # Construimos el documento para Mongo
    doc = datos_pedido.dict()

    # Convertimos a ObjectId los IDs que son referencias
    try:
        usuario_oid = ObjectId(datos_pedido.usuarioId)
        restaurante_oid = ObjectId(datos_pedido.restauranteId)
    except Exception:
        # Si los IDs vienen mal formados, dejamos que falle al insertar
        # o podrías lanzar una excepción personalizada
        raise

    doc["usuarioId"] = usuario_oid
    doc["restauranteId"] = restaurante_oid

    # Convertir productoId de items a ObjectId
    items_convertidos = []
    for item in datos_pedido.items:
        try:
            producto_oid = ObjectId(item.productoId)
        except Exception:
            raise
        item_doc = item.dict()
        item_doc["productoId"] = producto_oid
        items_convertidos.append(item_doc)
    doc["items"] = items_convertidos

    # Folio simple; luego lo puedes mejorar a CY-YYYY-xxxxx
    if not folio:
        folio = f"CY-{ahora.year}-{int(ahora.timestamp())}"
    doc["folio"] = folio

    # Estado inicial y cronología
    estado_inicial = "recibido"
    doc["estado"] = estado_inicial
    doc["realizadoEn"] = ahora
    doc["cronologia"] = [{"estado": estado_inicial, "en": ahora}]

    # Pago: si no viene nada, lo dejamos como simulado pendiente
    if not datos_pedido.pago:
        doc["pago"] = {
            "modo": "simulado",
            "estado": "pendiente",
            "referencia": None,
        }

    doc["creadoEn"] = ahora
    doc["actualizadoEn"] = ahora

    resultado = await bd[NOMBRE_COLECCION_PEDIDOS].insert_one(doc)
    doc_creado = await bd[NOMBRE_COLECCION_PEDIDOS].find_one(
        {"_id": resultado.inserted_id}
    )
    return _mapear_doc_a_pedido_leer(doc_creado)


async def obtener_pedido_por_id_servicio(
    bd: AsyncIOMotorDatabase,
    id_pedido: str,
) -> Optional[PedidoLeer]:
    try:
        oid = ObjectId(id_pedido)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION_PEDIDOS].find_one({"_id": oid})
    if not doc:
        return None
    return _mapear_doc_a_pedido_leer(doc)


async def listar_pedidos_por_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
    limite: int = 50,
    saltar: int = 0,
    estado: Optional[str] = None,
) -> List[PedidoLeer]:
    try:
        usuario_oid = ObjectId(id_usuario)
    except Exception:
        return []

    filtro: dict = {"usuarioId": usuario_oid}
    if estado:
        filtro["estado"] = estado

    cursor = (
        bd[NOMBRE_COLECCION_PEDIDOS]
        .find(filtro)
        .sort("realizadoEn", -1)
        .skip(saltar)
        .limit(limite)
    )

    pedidos: list[PedidoLeer] = []
    async for doc in cursor:
        pedidos.append(_mapear_doc_a_pedido_leer(doc))
    return pedidos


async def cambiar_estado_pedido_servicio(
    bd: AsyncIOMotorDatabase,
    id_pedido: str,
    datos_estado: PedidoCambiarEstado,
) -> Optional[PedidoLeer]:
    """
    Cambia el estado del pedido y añade un registro a la cronología.
    """
    try:
        oid = ObjectId(id_pedido)
    except Exception:
        return None

    ahora = datetime.utcnow()
    nuevo_evento = {"estado": datos_estado.estado, "en": ahora}

    resultado = await bd[NOMBRE_COLECCION_PEDIDOS].update_one(
        {"_id": oid},
        {
            "$set": {
                "estado": datos_estado.estado,
                "actualizadoEn": ahora,
            },
            "$push": {
                "cronologia": nuevo_evento,
            },
        },
    )

    if resultado.matched_count == 0:
        return None

    doc_actualizado = await bd[NOMBRE_COLECCION_PEDIDOS].find_one({"_id": oid})
    if not doc_actualizado:
        return None

    return _mapear_doc_a_pedido_leer(doc_actualizado)


# ----- Helpers internos -----


def _mapear_doc_a_pedido_leer(doc: dict) -> PedidoLeer:
    # IDs principales
    id_pedido = str(doc["_id"])
    usuarioId = str(doc["usuarioId"])
    restauranteId = str(doc["restauranteId"])

    # Items
    items: list[PedidoItem] = []
    for item_doc in doc.get("items", []):
        items.append(
            PedidoItem(
                productoId=str(item_doc["productoId"]),
                nombre=item_doc.get("nombre", ""),
                precio=float(item_doc.get("precio", 0)),
                cantidad=int(item_doc.get("cantidad", 0)),
                subtotal=float(item_doc.get("subtotal", 0)),
            )
        )

    # Dirección entrega
    dir_doc = doc.get("direccionEntrega", {})
    direccion = DireccionEntrega(
        etiqueta=dir_doc.get("etiqueta"),
        calle=dir_doc.get("calle", ""),
        ciudad=dir_doc.get("ciudad", ""),
        estado=dir_doc.get("estado", ""),
        cp=dir_doc.get("cp"),
    )

    # Cupon
    cupon_doc = doc.get("cupon")
    cupon: Optional[CuponPedido] = None
    if cupon_doc:
        cupon = CuponPedido(
            codigo=cupon_doc.get("codigo", ""),
            descuento=float(cupon_doc.get("descuento", 0)),
        )

    # Montos
    montos_doc = doc.get("montos", {})
    montos = MontosPedido(
        subtotal=float(montos_doc.get("subtotal", 0)),
        tarifaEnvio=float(montos_doc.get("tarifaEnvio", 0)),
        total=float(montos_doc.get("total", 0)),
    )

    # Cronología
    cronologia_docs = doc.get("cronologia", [])
    cronologia: list[EventoEstadoPedido] = []
    for ev in cronologia_docs:
        cronologia.append(
            EventoEstadoPedido(
                estado=ev.get("estado", ""),
                en=ev.get("en"),
            )
        )

    # Pago
    pago_doc = doc.get("pago")
    pago: Optional[PagoPedido] = None
    if pago_doc:
        pago = PagoPedido(
            modo=pago_doc.get("modo", ""),
            estado=pago_doc.get("estado", ""),
            referencia=pago_doc.get("referencia"),
        )

    return PedidoLeer(
        id=id_pedido,
        folio=doc.get("folio", ""),
        usuarioId=usuarioId,
        restauranteId=restauranteId,
        items=items,
        direccionEntrega=direccion,
        cupon=cupon,
        montos=montos,
        estado=doc.get("estado", ""),
        realizadoEn=doc.get("realizadoEn"),
        cronologia=cronologia,
        pago=pago,
        creadoEn=doc.get("creadoEn"),
        actualizadoEn=doc.get("actualizadoEn"),
    )
