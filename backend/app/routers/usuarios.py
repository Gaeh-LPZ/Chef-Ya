from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime

from db.mongo import obtener_bd
from schemas.usuario import (
    UsuarioLeer,
    UsuarioActualizar,
    DireccionUsuarioCrear,
    DireccionUsuarioLeer,
    UsuarioCrear
)
from services.usuario_service import (
    listar_usuarios_servicio,
    obtener_usuario_por_id_servicio,
    actualizar_usuario_servicio,
    listar_direcciones_usuario_servicio,
    agregar_direccion_usuario_servicio,
    eliminar_direccion_usuario_servicio,
    crear_usuario_servicio,
)

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.get("/", response_model=List[UsuarioLeer])
async def listar_usuarios(
    limite: int = 50,
    saltar: int = 0,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Lista todos los usuarios (con paginación básica).
    """
    return await listar_usuarios_servicio(bd, limite=limite, saltar=saltar)


@router.get("/{id_usuario}", response_model=UsuarioLeer)
async def obtener_usuario(
    id_usuario: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un usuario por su id.
    """
    usuario = await obtener_usuario_por_id_servicio(bd, id_usuario)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )
    return usuario


@router.put("/{id_usuario}", response_model=UsuarioLeer)
async def actualizar_usuario(
    id_usuario: str,
    datos_actualizacion: UsuarioActualizar,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Actualiza datos básicos de un usuario (nombre, teléfono).
    """
    usuario = await actualizar_usuario_servicio(bd, id_usuario, datos_actualizacion)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )
    return usuario


@router.get("/{id_usuario}/direcciones", response_model=List[DireccionUsuarioLeer])
async def listar_direcciones_usuario(
    id_usuario: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Lista las direcciones de un usuario.
    """
    direcciones = await listar_direcciones_usuario_servicio(bd, id_usuario)
    if direcciones is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )
    return direcciones


@router.post("/{id_usuario}/direcciones",response_model=List[DireccionUsuarioLeer],status_code=status.HTTP_201_CREATED,)
async def agregar_direccion_usuario(
    id_usuario: str,
    direccion: DireccionUsuarioCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Agrega una nueva dirección al usuario y devuelve la lista actualizada.
    """
    direcciones = await agregar_direccion_usuario_servicio(bd, id_usuario, direccion)
    if direcciones is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )
    return direcciones

@router.post("/", response_model=UsuarioLeer, status_code=status.HTTP_201_CREATED)
async def crear_usuario(
    datos_usuario: UsuarioCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Crea un nuevo usuario.
    """
    usuario = await crear_usuario_servicio(bd, datos_usuario)
    return usuario

@router.delete("/{id_usuario}/direcciones/{indice}",response_model=List[DireccionUsuarioLeer],)
async def eliminar_direccion_usuario(
    id_usuario: str,
    indice: int,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Elimina una dirección por índice (posición en el arreglo) 
    y devuelve la lista actualizada.
    """
    direcciones = await eliminar_direccion_usuario_servicio(bd, id_usuario, indice)
    if direcciones is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario o dirección no encontrada",
        )
    return direcciones

class NotificacionLeer(BaseModel):
    id: str
    titulo: str
    mensaje: str
    leida: bool

@router.get("/{id_usuario}/notificaciones/no-leidas")
async def obtener_notificaciones_no_leidas(
    id_usuario: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    try:
        oid = ObjectId(id_usuario)
    except:
        return []

    # Buscar notificaciones no leídas
    cursor = bd["notificaciones"].find({"usuarioId": oid, "leida": False})
    notificaciones = []
    
    async for doc in cursor:
        notificaciones.append({
            "id": str(doc["_id"]),
            "titulo": doc.get("titulo", ""),
            "mensaje": doc.get("mensaje", ""),
            "leida": doc.get("leida", False)
        })
        
        # Opcional: Marcarlas como leídas automáticamente al entregarlas
        # para que no salgan repetidas (polling simple)
        await bd["notificaciones"].update_one(
            {"_id": doc["_id"]},
            {"$set": {"leida": True, "leidaEn": datetime.utcnow()}}
        )
        
    return notificaciones