from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from services.utils import generar_slug

from schemas.restaurante import (
    RestauranteCrear,
    RestauranteLeer,
    Direccion,
    Geo,
    Calificacion,
    Entrega,
    RestauranteActualizar
)

NOMBRE_COLECCION = "restaurantes"

async def crear_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    datos_restaurante: RestauranteCrear,
) -> str:
    """
    crea un restaurante en la colección de "restaurantes" y devuelve el id como string.
    """
    documento = datos_restaurante.dict()

    slug = documento["slug"] or generar_slug(documento["nombre"])
    slug_final = await _asegurar_slug_unico(bd, slug)

    documento["slug"] = slug_final

    ahora = datetime.utcnow()
    documento["creadoEn"] = ahora
    documento["actualizadoEn"] = ahora

    resultado = await bd[NOMBRE_COLECCION].insert_one(documento)
    return str(resultado.inserted_id)


async def listar_restaurantes_servicio(
    bd: AsyncIOMotorDatabase,
    solo_activos: bool = True,
) -> List[RestauranteLeer]:
    """
    devuelve la lista de restaurantes (por defecto solo los activos).
    """
    filtro = {}
    if solo_activos:
        filtro["activo"] = True

    cursor = bd[NOMBRE_COLECCION].find(filtro)
    restaurantes: list[RestauranteLeer] = []

    async for doc in cursor:
        restaurantes.append(_mapear_doc_a_restaurante_leer(doc))

    return restaurantes


async def obtener_restaurante_por_id_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
) -> Optional[RestauranteLeer]:
    """
    devuelve un restaurante por su id,si no exists o es invalido devuelve None.
    """
    try:
        oid = ObjectId(id_restaurante)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc:
        return None

    return _mapear_doc_a_restaurante_leer(doc)

async def obtener_restaurante_por_slug_servicio(
    bd: AsyncIOMotorDatabase,
    slug_restaurante: str,
) -> Optional[RestauranteLeer]:
    """
    devuelve un restaurante por su slug, si no existe o es invalido devuelve None
    """
    
    oslug = slug_restaurante

    doc = await bd[NOMBRE_COLECCION].find_one({"slug": oslug})
    if not doc:
        return None
    
    return _mapear_doc_a_restaurante_leer(doc)

#actualiazmos los datos del restaurante
async def actualizar_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
    datos_actualizacion: RestauranteActualizar,
) -> Optional[RestauranteLeer]:
    """
    Actualiza los datos de un restaurante.
    Importante: el slug NO se cambia aunque venga en la petición.
    Devuelve el restaurante actualizado o None si no existe / id inválido.
    """
    try:
        oid = ObjectId(id_restaurante)
    except Exception:
        return None

    # Verificamos que exista
    doc_existente = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc_existente:
        return None

    # Tomamos solo los campos que el cliente envió
    campos_update = datos_actualizacion.dict(exclude_unset=True)

    # No permitimos cambiar el slug desde aquí
    if "slug" in campos_update:
        campos_update.pop("slug")

    # Si no hay nada que actualizar, devolvemos el existente
    if not campos_update:
        return _mapear_doc_a_restaurante_leer(doc_existente)

    campos_update["actualizadoEn"] = datetime.utcnow()

    await bd[NOMBRE_COLECCION].update_one(
        {"_id": oid},
        {"$set": campos_update},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc_actualizado:
        return None

    return _mapear_doc_a_restaurante_leer(doc_actualizado)

# aqui cambiamos el estado del reaturante
async def cambiar_estado_activo_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
    activo: bool,
) -> Optional[RestauranteLeer]:
    """
    Cambia el campo 'activo' de un restaurante (true/false).
    Devuelve el restaurante actualizado o None si no existe / id inválido.
    """
    try:
        oid = ObjectId(id_restaurante)
    except Exception:
        return None

    resultado = await bd[NOMBRE_COLECCION].update_one(
        {"_id": oid},
        {
            "$set": {
                "activo": activo,
                "actualizadoEn": datetime.utcnow(),
            }
        },
    )

    if resultado.matched_count == 0:
        return None

    doc_actualizado = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc_actualizado:
        return None

    return _mapear_doc_a_restaurante_leer(doc_actualizado)

# aqui mapeamos al tipo RestauranteLeer cada doc de mongo
def _mapear_doc_a_restaurante_leer(doc: dict) -> RestauranteLeer:
    """
    función interna para convertir un documento de mongo a un RestauranteLeer para
    mantener el mapeo en un solo lugar
    """
    direccion_doc = doc.get("direccion", {})
    geo_doc = direccion_doc.get("geo", {})

    direccion = Direccion(
        calle=direccion_doc.get("calle", ""),
        ciudad=direccion_doc.get("ciudad", ""),
        estado=direccion_doc.get("estado", ""),
        cp=direccion_doc.get("cp"),
        geo=Geo(
            lat=geo_doc.get("lat", 0.0),
            lng=geo_doc.get("lng", 0.0),
        ),
    )

    calificacion_doc = doc.get("calificacion")
    calificacion = None
    if calificacion_doc:
        calificacion = Calificacion(
            promedio=calificacion_doc.get("promedio", 0.0),
            conteo=calificacion_doc.get("conteo", 0),
        )

    entrega_doc = doc.get("entrega")
    entrega = None
    if entrega_doc:
        entrega = Entrega(
            minutosPromedio=entrega_doc.get("minutosPromedio", 0),
            tarifa=entrega_doc.get("tarifa", 0.0),
        )

    return RestauranteLeer(
        id=str(doc["_id"]),
        nombre=doc["nombre"],
        slug=doc["slug"],
        descripcion=doc.get("descripcion"),
        categorias=[str(c) for c in doc.get("categorias", [])],
        direccion=direccion,
        activo=doc.get("activo", True),
        calificacion=calificacion,
        entrega=entrega,
    )

# importente!, debemos asegurar que el slug no cambie al actualizar el nombre
async def _asegurar_slug_unico(bd: AsyncIOMotorDatabase, slug_base: str) -> str:
    """
    funcion interna que nos permite garantizar unicidad en los slugs
    devuelve un slug unico
    """
    slug = slug_base
    contador = 1

    while True:
        existe = await bd[NOMBRE_COLECCION].find_one({"slug": slug})
        if not existe:
            return slug

        contador += 1
        slug = f"{slug_base}-{contador}"