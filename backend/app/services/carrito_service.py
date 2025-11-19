from typing import Optional, List
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from schemas.carrito import (
    CarritoLeer,
    CarritoItemCrear,
    CarritoItemLeer,
    CuponAplicado,
)

NOMBRE_COLECCION_CARRITOS = "carritos"
NOMBRE_COLECCION_CUPONES = "cupones"

async def _obtener_o_crear_carrito_doc_por_usuario(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
) -> dict:
    """
    Busca el carrito por usuarioId.
    Si no existe, crea uno vacío.
    Garantiza 1 carrito por usuario.
    """
    try:
        usuario_oid = ObjectId(id_usuario)
    except Exception:
        raise ValueError("id_usuario inválido")

    doc = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"usuarioId": usuario_oid})
    if doc:
        return doc

    ahora = datetime.utcnow()
    nuevo = {
        "usuarioId": usuario_oid,
        "items": [],
        "cuponAplicado": None,
        "moneda": "MXN",
        "subtotal": 0.0,
        "tarifaEnvio": 0.0,
        "total": 0.0,
        "actualizadoEn": ahora,
    }
    resultado = await bd[NOMBRE_COLECCION_CARRITOS].insert_one(nuevo)
    doc = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": resultado.inserted_id})
    return doc


async def _obtener_carrito_doc_por_id(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
) -> Optional[dict]:
    """
    Busca un carrito por su _id. No crea nada.
    """
    try:
        carrito_oid = ObjectId(id_carrito)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito_oid})
    return doc


def _recalcular_montos(carrito: dict) -> None:
    subtotal = 0.0
    for item in carrito.get("items", []):
        item["subtotal"] = item["precio"] * item["cantidad"]
        subtotal += item["subtotal"]

    carrito["subtotal"] = subtotal

    tarifa_envio = carrito.get("tarifaEnvio", 0.0)
    descuento = 0.0
    cupon = carrito.get("cuponAplicado")
    if cupon:
        descuento = cupon.get("descuento", 0.0)

    carrito["total"] = subtotal + tarifa_envio - descuento
    carrito["actualizadoEn"] = datetime.utcnow()


def _mapear_doc_a_carrito_leer(doc: dict) -> CarritoLeer:
    items: List[CarritoItemLeer] = []
    for it in doc.get("items", []):
        items.append(
            CarritoItemLeer(
                restauranteId=str(it["restauranteId"]),
                productoId=str(it["productoId"]),
                nombre=it["nombre"],
                precio=it["precio"],
                cantidad=it["cantidad"],
                subtotal=it.get("subtotal", it["precio"] * it["cantidad"]),
            )
        )

    cupon_doc = doc.get("cuponAplicado")
    cupon = None
    if cupon_doc:
        cupon = CuponAplicado(
            codigo=cupon_doc.get("codigo", ""),
            descuento=cupon_doc.get("descuento", 0.0),
        )

    return CarritoLeer(
        id=str(doc["_id"]),
        usuarioId=str(doc["usuarioId"]),
        items=items,
        cuponAplicado=cupon,
        moneda=doc.get("moneda", "MXN"),
        subtotal=doc.get("subtotal", 0.0),
        tarifaEnvio=doc.get("tarifaEnvio", 0.0),
        total=doc.get("total", 0.0),
    )

async def obtener_o_crear_carrito_por_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
) -> Optional[CarritoLeer]:
    """
    Devuelve el carrito de un usuario.
    Si no existe, lo crea vacío.
    """
    try:
        doc = await _obtener_o_crear_carrito_doc_por_usuario(bd, id_usuario)
    except ValueError:
        return None

    return _mapear_doc_a_carrito_leer(doc)


async def obtener_carrito_por_id_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
) -> Optional[CarritoLeer]:
    doc = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not doc:
        return None
    return _mapear_doc_a_carrito_leer(doc)


async def agregar_item_carrito_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
    item_in: CarritoItemCrear,
) -> Optional[CarritoLeer]:
    carrito = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not carrito:
        return None

    items = carrito.get("items", [])

    try:
        restaurante_oid = ObjectId(item_in.restauranteId)
        producto_oid = ObjectId(item_in.productoId)
    except Exception:
        return None

    encontrado = False
    for it in items:
        if it["productoId"] == producto_oid and it["restauranteId"] == restaurante_oid:
            it["cantidad"] += item_in.cantidad
            encontrado = True
            break

    if not encontrado:
        items.append(
            {
                "restauranteId": restaurante_oid,
                "productoId": producto_oid,
                "nombre": item_in.nombre,
                "precio": item_in.precio,
                "cantidad": item_in.cantidad,
            }
        )

    carrito["items"] = items
    _recalcular_montos(carrito)

    await bd[NOMBRE_COLECCION_CARRITOS].update_one(
        {"_id": carrito["_id"]},
        {"$set": carrito},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito["_id"]})
    return _mapear_doc_a_carrito_leer(doc_actualizado)


async def actualizar_item_carrito_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
    indice: int,
    nueva_cantidad: int,
) -> Optional[CarritoLeer]:
    carrito = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not carrito:
        return None

    items = carrito.get("items", [])

    if indice < 0 or indice >= len(items):
        return None

    if nueva_cantidad <= 0:
        items.pop(indice)
    else:
        items[indice]["cantidad"] = nueva_cantidad

    carrito["items"] = items
    _recalcular_montos(carrito)

    await bd[NOMBRE_COLECCION_CARRITOS].update_one(
        {"_id": carrito["_id"]},
        {"$set": carrito},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito["_id"]})
    return _mapear_doc_a_carrito_leer(doc_actualizado)


async def eliminar_item_carrito_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
    indice: int,
) -> Optional[CarritoLeer]:
    carrito = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not carrito:
        return None

    items = carrito.get("items", [])
    if indice < 0 or indice >= len(items):
        return None

    items.pop(indice)
    carrito["items"] = items
    _recalcular_montos(carrito)

    await bd[NOMBRE_COLECCION_CARRITOS].update_one(
        {"_id": carrito["_id"]},
        {"$set": carrito},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito["_id"]})
    return _mapear_doc_a_carrito_leer(doc_actualizado)


async def vaciar_carrito_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
) -> Optional[CarritoLeer]:
    carrito = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not carrito:
        return None

    carrito["items"] = []
    carrito["cuponAplicado"] = None
    carrito["subtotal"] = 0.0
    carrito["tarifaEnvio"] = 0.0
    carrito["total"] = 0.0
    carrito["actualizadoEn"] = datetime.utcnow()

    await bd[NOMBRE_COLECCION_CARRITOS].update_one(
        {"_id": carrito["_id"]},
        {"$set": carrito},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito["_id"]})
    return _mapear_doc_a_carrito_leer(doc_actualizado)


async def aplicar_cupon_carrito_servicio(
    bd: AsyncIOMotorDatabase,
    id_carrito: str,
    codigo_cupon: str,
) -> Optional[CarritoLeer]:
    carrito = await _obtener_carrito_doc_por_id(bd, id_carrito)
    if not carrito:
        return None

    cupon = await bd[NOMBRE_COLECCION_CUPONES].find_one({"codigo": codigo_cupon, "activo": True})
    if not cupon:
        return None

    subtotal = carrito.get("subtotal", 0.0)
    subtotal_minimo = cupon.get("subtotalMinimo")
    if subtotal_minimo is not None and subtotal < subtotal_minimo:
        return None

    tipo = cupon.get("tipo", "fijo")
    valor = cupon.get("valor", 0.0)

    if tipo == "fijo":
        descuento = float(valor)
    else:
        descuento = subtotal * (valor / 100.0)

    carrito["cuponAplicado"] = {
        "codigo": codigo_cupon,
        "descuento": descuento,
    }

    _recalcular_montos(carrito)

    await bd[NOMBRE_COLECCION_CARRITOS].update_one(
        {"_id": carrito["_id"]},
        {"$set": carrito},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION_CARRITOS].find_one({"_id": carrito["_id"]})
    return _mapear_doc_a_carrito_leer(doc_actualizado)
