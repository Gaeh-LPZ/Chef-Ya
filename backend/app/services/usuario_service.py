# services/usuario_service.py
from typing import List, Optional
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from schemas.usuario import (
    UsuarioLeer,
    UsuarioActualizar,
    DireccionUsuarioCrear,
    DireccionUsuarioLeer,
    GeoUsuario,
    UsuarioCrear
)

NOMBRE_COLECCION_USUARIOS = "usuarios"


async def listar_usuarios_servicio(
    bd: AsyncIOMotorDatabase,
    limite: int = 50,
    saltar: int = 0,
) -> List[UsuarioLeer]:
    cursor = (
        bd[NOMBRE_COLECCION_USUARIOS]
        .find({})
        .skip(saltar)
        .limit(limite)
    )
    usuarios: list[UsuarioLeer] = []
    async for doc in cursor:
        usuarios.append(_mapear_doc_a_usuario_leer(doc))
    return usuarios


async def obtener_usuario_por_id_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
) -> Optional[UsuarioLeer]:
    try:
        oid = ObjectId(id_usuario)
    except Exception:
        return None

    doc = await bd[NOMBRE_COLECCION_USUARIOS].find_one({"_id": oid})
    if not doc:
        return None

    return _mapear_doc_a_usuario_leer(doc)


async def actualizar_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
    datos_actualizacion: UsuarioActualizar,
) -> Optional[UsuarioLeer]:
    try:
        oid = ObjectId(id_usuario)
    except Exception:
        return None

    campos_update = datos_actualizacion.dict(exclude_unset=True)
    if not campos_update:
        # nada que actualizar
        doc = await bd[NOMBRE_COLECCION_USUARIOS].find_one({"_id": oid})
        if not doc:
            return None
        return _mapear_doc_a_usuario_leer(doc)

    campos_update["actualizadoEn"] = datetime.utcnow()

    resultado = await bd[NOMBRE_COLECCION_USUARIOS].update_one(
        {"_id": oid},
        {"$set": campos_update},
    )
    if resultado.matched_count == 0:
        return None

    doc_actualizado = await bd[NOMBRE_COLECCION_USUARIOS].find_one({"_id": oid})
    if not doc_actualizado:
        return None

    return _mapear_doc_a_usuario_leer(doc_actualizado)


async def listar_direcciones_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
) -> Optional[List[DireccionUsuarioLeer]]:
    usuario = await obtener_usuario_doc_por_id(bd, id_usuario)
    if not usuario:
        return None

    direcciones_doc = usuario.get("direcciones", [])
    direcciones: list[DireccionUsuarioLeer] = []

    for d in direcciones_doc:
        direcciones.append(_mapear_doc_a_direccion_leer(d))

    return direcciones


async def agregar_direccion_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
    direccion_nueva: DireccionUsuarioCrear,
) -> Optional[List[DireccionUsuarioLeer]]:
    usuario = await obtener_usuario_doc_por_id(bd, id_usuario)
    if not usuario:
        return None

    direcciones = usuario.get("direcciones", [])
    direcciones.append(direccion_nueva.dict())

    try:
        oid = ObjectId(id_usuario)
    except Exception:
        return None

    await bd[NOMBRE_COLECCION_USUARIOS].update_one(
        {"_id": oid},
        {
            "$set": {
                "direcciones": direcciones,
                "actualizadoEn": datetime.utcnow(),
            }
        },
    )

    # devolvemos la lista actualizada
    usuario_actualizado = await obtener_usuario_doc_por_id(bd, id_usuario)
    direcciones_doc = usuario_actualizado.get("direcciones", [])
    return [_mapear_doc_a_direccion_leer(d) for d in direcciones_doc]


async def eliminar_direccion_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
    indice: int,
) -> Optional[List[DireccionUsuarioLeer]]:
    usuario = await obtener_usuario_doc_por_id(bd, id_usuario)
    if not usuario:
        return None

    direcciones = usuario.get("direcciones", [])

    if indice < 0 or indice >= len(direcciones):
        return None  # índice inválido

    # quitamos la dirección
    direcciones.pop(indice)

    try:
        oid = ObjectId(id_usuario)
    except Exception:
        return None

    await bd[NOMBRE_COLECCION_USUARIOS].update_one(
        {"_id": oid},
        {
            "$set": {
                "direcciones": direcciones,
                "actualizadoEn": datetime.utcnow(),
            }
        },
    )

    usuario_actualizado = await obtener_usuario_doc_por_id(bd, id_usuario)
    direcciones_doc = usuario_actualizado.get("direcciones", [])
    return [_mapear_doc_a_direccion_leer(d) for d in direcciones_doc]


# ----- Helpers internos -----


async def obtener_usuario_doc_por_id(
    bd: AsyncIOMotorDatabase,
    id_usuario: str,
) -> Optional[dict]:
    try:
        oid = ObjectId(id_usuario)
    except Exception:
        return None

    return await bd[NOMBRE_COLECCION_USUARIOS].find_one({"_id": oid})


def _mapear_doc_a_usuario_leer(doc: dict) -> UsuarioLeer:
    direcciones: list[DireccionUsuarioLeer] = []
    for d in doc.get("direcciones", []):
        direcciones.append(_mapear_doc_a_direccion_leer(d))

    return UsuarioLeer(
        id=str(doc["_id"]),
        googleId=doc.get("googleId", ""),
        nombre=doc.get("nombre", ""),
        correo=doc.get("correo", ""),
        telefono=doc.get("telefono"),
        direcciones=direcciones,
    )


def _mapear_doc_a_direccion_leer(d: dict) -> DireccionUsuarioLeer:
    geo_doc = d.get("geo", {})
    geo = GeoUsuario(
        lat=geo_doc.get("lat", 0.0),
        lng=geo_doc.get("lng", 0.0),
    )
    return DireccionUsuarioLeer(
        etiqueta=d.get("etiqueta", ""),
        calle=d.get("calle", ""),
        ciudad=d.get("ciudad", ""),
        estado=d.get("estado", ""),
        cp=d.get("cp"),
        geo=geo,
    )

async def crear_usuario_servicio(
    bd: AsyncIOMotorDatabase,
    datos_usuario: UsuarioCrear,
) -> UsuarioLeer:
    """
    Crea un nuevo usuario en la colección 'usuarios'
    y devuelve el usuario creado.
    """
    documento = datos_usuario.dict()
    ahora = datetime.utcnow()
    documento["creadoEn"] = ahora
    documento["actualizadoEn"] = ahora

    resultado = await bd[NOMBRE_COLECCION_USUARIOS].insert_one(documento)
    doc_creado = await bd[NOMBRE_COLECCION_USUARIOS].find_one(
        {"_id": resultado.inserted_id}
    )
    return _mapear_doc_a_usuario_leer(doc_creado)