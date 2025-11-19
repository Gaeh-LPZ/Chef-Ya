from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from services.utils import generar_slug, _asegurar_slug_unico
from services.categoria_service import crear_categoria_servicio

from schemas.restaurante import (
    RestauranteCrear,
    RestauranteLeer,
    Direccion,
    Geo,
    Calificacion,
    Entrega,
    RestauranteActualizar,
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

    slug = generar_slug(documento["nombre"])
    slug_final = await _asegurar_slug_unico(bd, slug,NOMBRE_COLECCION)
    documento["slug"] = slug_final


    nombres_categorias = documento.get("categorias", []) or []
    lista_slugs: list[str] = []

    for nombre_categoria in nombres_categorias:
        slug_cat = await crear_categoria_servicio(bd, nombre_categoria)
        lista_slugs.append(slug_cat)

    documento["categorias"] = lista_slugs

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

async def buscar_restaurantes_servicio(
    bd: AsyncIOMotorDatabase,
    texto: str,
    solo_activos: bool = True,
) -> List[RestauranteLeer]:
    """
    Busca restaurantes por nombre, descripción o slug usando búsqueda textual simple.
    """
    if not texto:
        return []

    filtro: dict = {
        "$or": [
            {"nombre": {"$regex": texto, "$options": "i"}},
            {"descripcion": {"$regex": texto, "$options": "i"}},
            {"slug": {"$regex": texto, "$options": "i"}},
        ]
    }

    if solo_activos:
        filtro["activo"] = True

    cursor = bd[NOMBRE_COLECCION].find(filtro)
    restaurantes: list[RestauranteLeer] = []

    async for doc in cursor:
        restaurantes.append(_mapear_doc_a_restaurante_leer(doc))

    return restaurantes


async def filtrar_restaurantes_servicio(
    bd: AsyncIOMotorDatabase,
    rating_min: Optional[float] = None,
    tiempo_max: Optional[int] = None,
    costo_envio_max: Optional[float] = None,
    solo_activos: bool = True,
) -> List[RestauranteLeer]:
    """
    Filtra restaurantes por:
    - rating mínimo
    - tiempo de entrega máximo
    - costo de envío máximo
    """
    filtro: dict = {}

    if solo_activos:
        filtro["activo"] = True

    condiciones: list = []

    if rating_min is not None:
        condiciones.append({"calificacion.promedio": {"$gte": rating_min}})

    if tiempo_max is not None:
        condiciones.append({"entrega.minutosPromedio": {"$lte": tiempo_max}})

    if costo_envio_max is not None:
        condiciones.append({"entrega.tarifa": {"$lte": costo_envio_max}})

    if condiciones:
        filtro["$and"] = condiciones

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

# devolvemos los restaurante spor categoria
async def obtener_restaurantes_por_categoria_servicio(
    bd: AsyncIOMotorDatabase,
    categotria_restaurante: str,
) -> List[RestauranteLeer]:
    """
    devuelve los restaurantes de la categoria enviada
    """
    
    ocategoria = [categotria_restaurante]

    busqueda = bd[NOMBRE_COLECCION].find({"categorias": ocategoria})
    
    if not busqueda:
        return None
    restaurantes: list[RestauranteLeer] = []

    async for doc in busqueda:
        restaurantes.append(_mapear_doc_a_restaurante_leer(doc))

    return restaurantes

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

    nombres_categorias = campos_update.pop("categorias", None)

    if nombres_categorias is not None:
        lista_slugs = []

        for nombre_cat in nombres_categorias:
            # Tu servicio retorna UN SLUG (string)
            slug = await crear_categoria_servicio(bd, nombre_cat)
            lista_slugs.append(slug)

        # Guardar lista de slugs en el restaurante
        campos_update["categorias"] = lista_slugs

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

async def listar_restaurantes_por_categorias_servicio(
    bd: AsyncIOMotorDatabase,
    categorias: List[str],
) -> List[RestauranteLeer]:
    """
    Devuelve todos los restaurantes que tengan al menos una
    de las categorías (slugs) indicadas.
    """

    # Si viene vacío, devolvemos lista vacía
    if not categorias:
        return []

    # Opcional: normalizar a slug/minúsculas por si el cliente manda "Mexicana"
    categorias_normalizadas = [c.strip().lower() for c in categorias if c.strip()]

    if not categorias_normalizadas:
        return []

    cursor = bd[NOMBRE_COLECCION].find(
        {"categorias": {"$in": categorias_normalizadas}}
    )

    docs = await cursor.to_list(length=None)

    # asumo que ya tienes esta función en tu servicio
    return [_mapear_doc_a_restaurante_leer(doc) for doc in docs]