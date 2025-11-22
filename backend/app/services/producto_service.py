# app/services/producto_service.py
from typing import List, Optional
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from schemas.producto import (
    ProductoCrear,
    ProductoLeer,
    ProductoActualizar,
)

NOMBRE_COLECCION = "productos"


async def crear_producto_servicio(
    bd: AsyncIOMotorDatabase,
    datos_producto: ProductoCrear,
) -> Optional[str]:
    """
    Crea un producto en la colección 'productos' y devuelve el id como string.
    Si el restauranteId es inválido, devuelve None.
    """
    documento = datos_producto.dict()

    # Validamos que restauranteId sea un ObjectId válido
    try:
        restaurante_oid = ObjectId(documento["restauranteId"])
    except Exception:
        return None

    documento["restauranteId"] = restaurante_oid

    ahora = datetime.utcnow()
    documento["creadoEn"] = ahora
    documento["actualizadoEn"] = ahora

    resultado = await bd[NOMBRE_COLECCION].insert_one(documento)
    return str(resultado.inserted_id)


async def obtener_producto_por_id_servicio(
    bd: AsyncIOMotorDatabase,
    id_producto: str,
) -> Optional[ProductoLeer]:
    """
    Devuelve un producto por su id.
    Si el id es inválido o no existe, devuelve None.
    """
    try:
        oid = ObjectId(id_producto)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc:
        return None

    return _mapear_doc_a_producto_leer(doc)


async def listar_productos_por_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
    solo_disponibles: bool = True,
) -> List[ProductoLeer]:
    """
    Lista los productos de un restaurante. Por defecto solo los disponibles.
    """
    try:
        restaurante_oid = ObjectId(id_restaurante)
    except Exception:
        # restauranteId inválido → lista vacía
        return []

    filtro = {"restauranteId": restaurante_oid}
    if solo_disponibles:
        filtro["disponible"] = True

    cursor = bd[NOMBRE_COLECCION].find(filtro)
    productos: list[ProductoLeer] = []

    async for doc in cursor:
        productos.append(_mapear_doc_a_producto_leer(doc))

    return productos


async def actualizar_producto_servicio(
    bd: AsyncIOMotorDatabase,
    id_producto: str,
    datos_actualizar: ProductoActualizar,
) -> bool:
    """
    Actualiza un producto.
    Devuelve True si se modificó algún documento, False si no existe o el id es inválido.
    """
    try:
        oid = ObjectId(id_producto)
    except Exception:
        return False

    cambios = datos_actualizar.dict(exclude_unset=True)

    if not cambios:
        return False

    cambios["actualizadoEn"] = datetime.utcnow()

    resultado = await bd[NOMBRE_COLECCION].update_one(
        {"_id": oid},
        {"$set": cambios},
    )

    return resultado.modified_count == 1


async def eliminar_producto_servicio(
    bd: AsyncIOMotorDatabase,
    id_producto: str,
) -> bool:
    """
    Elimina un producto (delete físico).
    Devuelve True si se eliminó, False si el id es inválido o no existe.
    """
    try:
        oid = ObjectId(id_producto)
    except Exception:
        return False

    resultado = await bd[NOMBRE_COLECCION].delete_one({"_id": oid})
    return resultado.deleted_count == 1


def _mapear_doc_a_producto_leer(doc: dict) -> ProductoLeer:
    """
    Convierte un documento de Mongo a ProductoLeer.
    """
    return ProductoLeer(
        id=str(doc["_id"]),
        restauranteId=str(doc["restauranteId"]),
        nombre=doc["nombre"],
        descripcion=doc.get("descripcion"),
        precio=doc.get("precio", 0.0),
        imagen=doc.get("imagen"),
        disponible=doc.get("disponible", True),
        etiquetas=doc.get("etiquetas", []),
        categoriaMenu=doc.get("categoriaMenu"),
    )
