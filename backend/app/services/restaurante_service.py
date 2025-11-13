from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from schemas.restaurante import (
    RestauranteCrear,
    RestauranteLeer,
    Direccion,
    Geo,
    Calificacion,
    Entrega,
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