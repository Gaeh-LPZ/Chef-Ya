from typing import List, Optional
from datetime import datetime, time
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
    HorarioRestaurante,   # 🔹 NUEVO
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
    slug_final = await _asegurar_slug_unico(bd, slug, NOMBRE_COLECCION)
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


async def listar_restaurantes_populares_servicio(
    bd: AsyncIOMotorDatabase,
    limite: int = 6,
) -> List[RestauranteLeer]:
    """
    Devuelve una lista de restaurantes populares.
    Solo toma restaurantes activos.
    """
    cursor = (
        bd[NOMBRE_COLECCION]
        .find({"activo": True})
        .sort([
            ("calificacion.promedio", -1),
            ("calificacion.conteo", -1),
        ])
        .limit(limite)
    )

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


async def obtener_restaurantes_por_categoria_servicio(
    bd: AsyncIOMotorDatabase,
    categotria_restaurante: str,
) -> List[RestauranteLeer]:
    """
    devuelve los restaurantes de la categoria enviada
    """
    ocategoria = [categotria_restaurante]

    busqueda = bd[NOMBRE_COLECCION].find({"categorias": ocategoria})

    restaurantes: list[RestauranteLeer] = []

    async for doc in busqueda:
        restaurantes.append(_mapear_doc_a_restaurante_leer(doc))

    return restaurantes


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

    doc_existente = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc_existente:
        return None

    campos_update = datos_actualizacion.dict(exclude_unset=True)

    if "slug" in campos_update:
        campos_update.pop("slug")

    if not campos_update:
        return _mapear_doc_a_restaurante_leer(doc_existente)

    campos_update["actualizadoEn"] = datetime.utcnow()

    nombres_categorias = campos_update.pop("categorias", None)

    if nombres_categorias is not None:
        lista_slugs = []
        for nombre_cat in nombres_categorias:
            slug = await crear_categoria_servicio(bd, nombre_cat)
            lista_slugs.append(slug)
        campos_update["categorias"] = lista_slugs

    await bd[NOMBRE_COLECCION].update_one(
        {"_id": oid},
        {"$set": campos_update},
    )

    doc_actualizado = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc_actualizado:
        return None

    return _mapear_doc_a_restaurante_leer(doc_actualizado)


async def cambiar_estado_activo_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
    activo: bool,
) -> Optional[RestauranteLeer]:
    """
    Cambia el campo 'activo' de un restaurante (true/false).
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


async def listar_restaurantes_por_categorias_servicio(
    bd: AsyncIOMotorDatabase,
    categorias: List[str],
) -> List[RestauranteLeer]:
    """
    Devuelve todos los restaurantes que tengan al menos una
    de las categorías (slugs) indicadas.
    """
    if not categorias:
        return []

    categorias_normalizadas = [c.strip().lower() for c in categorias if c.strip()]

    if not categorias_normalizadas:
        return []

    cursor = bd[NOMBRE_COLECCION].find(
        {"categorias": {"$in": categorias_normalizadas}}
    )

    docs = await cursor.to_list(length=None)
    return [_mapear_doc_a_restaurante_leer(doc) for doc in docs]


def _parse_hora(hora_str: str) -> Optional[time]:
    try:
        partes = str(hora_str).split(":")
        if len(partes) < 2:
            return None
        horas = int(partes[0])
        minutos = int(partes[1])
        return time(hour=horas, minute=minutos)
    except Exception:
        return None


def _esta_en_servicio(doc: dict, momento: datetime) -> bool:
    """
    Determina si el restaurante está en servicio dado un momento (día/hora).
    Si algo viene raro en los datos, devolvemos False sin romper nada.
    """

    # 1) Si no está activo, no lo mostramos
    if not doc.get("activo", True):
        return False

    horario_doc = doc.get("horario") or {}

    # 2) Si NO hay horario, consideramos que está ABIERTO (compatibilidad con datos viejos)
    if not horario_doc:
        return True

    # 3) Día actual en español
    dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    dia_idx = momento.weekday()  # 0 = lunes, 6 = domingo
    dia_actual = dias[dia_idx]

    # 4) Si hay diasServicio, lo respetamos; si no, asumimos que abre los días que tengan horario
    dias_servicio = doc.get("diasServicio")
    if dias_servicio:
        if dia_actual not in dias_servicio:
            return False
    else:
        if dia_actual not in horario_doc:
            return False

    dia_horario = horario_doc.get(dia_actual)
    if not isinstance(dia_horario, dict):
        return False

    abre_str = str(dia_horario.get("abre", "")).strip()
    cierra_str = str(dia_horario.get("cierra", "")).strip()

    abre = _parse_hora(abre_str)
    cierra = _parse_hora(cierra_str)

    if not abre or not cierra:
        # si las horas vienen mal formadas
        return False

    ahora_time = momento.time()

    # 5) Manejar horarios que cruzan medianoche
    if cierra <= abre:
        # ejemplo: 19:00 -> 02:00
        return (ahora_time >= abre) or (ahora_time <= cierra)
    else:
        # horario normal
        return abre <= ahora_time <= cierra


async def listar_restaurantes_en_servicio_servicio(
    bd: AsyncIOMotorDatabase,
    momento: Optional[datetime] = None,
) -> List[RestauranteLeer]:
    """
    Lista los restaurantes:
    - que tienen activo = True
    - y que, según horario/día, están en servicio.

    Si falta el campo 'horario', los consideramos abiertos
    (para no dejarte la lista vacía por errores de datos).
    """

    # 👉 Usa hora local del servidor; si prefieres UTC, cambia a utcnow()
    if momento is None:
        momento = datetime.utcnow()

    cursor = bd[NOMBRE_COLECCION].find({"activo": True})
    restaurantes: list[RestauranteLeer] = []

    async for doc in cursor:
        try:
            if _esta_en_servicio(doc, momento):
                restaurantes.append(_mapear_doc_a_restaurante_leer(doc))
        except Exception:
            # Si algo raro pasa evaluando horario de este doc,
            # lo consideramos abierto para no romper toda la lista.
            restaurantes.append(_mapear_doc_a_restaurante_leer(doc))

    return restaurantes




# 🔹 NUEVO: servicio para devolver la info de horario de un restaurante
async def obtener_horario_restaurante_servicio(
    bd: AsyncIOMotorDatabase,
    id_restaurante: str,
) -> Optional[HorarioRestaurante]:
    try:
        oid = ObjectId(id_restaurante)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION].find_one({"_id": oid})
    if not doc:
        return None

    return HorarioRestaurante(
        id=str(doc["_id"]),
        nombre=doc.get("nombre", ""),
        slug=doc.get("slug"),
        horario=doc.get("horario"),
        diasServicio=doc.get("diasServicio"),
        url_localizacion=doc.get("url_localizacion"),
    )


# aqui mapeamos al tipo RestauranteLeer cada doc de mongo
def _mapear_doc_a_restaurante_leer(doc: dict) -> RestauranteLeer:
    """
    función interna para convertir un documento de mongo a un RestauranteLeer.
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
        imagen=doc.get("imagen"),
        imagen_banner=doc.get("imagen_banner"),
        # 🔹 NUEVO
        horario=doc.get("horario"),
        diasServicio=doc.get("diasServicio"),
        url_localizacion=doc.get("url_localizacion"),
    )
