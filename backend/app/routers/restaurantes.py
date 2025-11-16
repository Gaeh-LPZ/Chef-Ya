from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from schemas.restaurante import RestauranteCrear, RestauranteLeer, EstadoActivo, RestauranteActualizar
from services.restaurante_service import (
    crear_restaurante_servicio,
    listar_restaurantes_servicio,
    obtener_restaurante_por_id_servicio,
    obtener_restaurante_por_slug_servicio,
    actualizar_restaurante_servicio,
    cambiar_estado_activo_restaurante_servicio,
)

router = APIRouter(prefix="/restaurantes", tags=["Restaurantes"],)

@router.post("/", response_model=str, status_code=status.HTTP_201_CREATED,)
async def crear_restaurante(
    datos_restaurante: RestauranteCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    crea un nuevo restaurante en la base de datos y
    devuelve el id generado como string.
    """
    nuevo_id = await crear_restaurante_servicio(bd, datos_restaurante)
    return nuevo_id


@router.get("/", response_model=List[RestauranteLeer],)
async def listar_restaurantes(
    solo_activos: bool = True,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    lista los restaurantes. Por defecto, solo los activos,
    puedes usar ?solo_activos=false para traer todos.
    """
    restaurantes = await listar_restaurantes_servicio(bd, solo_activos=solo_activos)
    return restaurantes


@router.get("/id/{id_restaurante}", response_model=RestauranteLeer,)
async def obtener_restaurante(
    id_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un restaurante por su id, si no existe o el id es inválido, devuelve 404.
    """
    restaurante = await obtener_restaurante_por_id_servicio(bd, id_restaurante)
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante

@router.get("/slug/{slug_restaurante}", response_model=RestauranteLeer,)
async def obtener_restaurante_slug(
    slug_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un restaurante por su slug, si no existe o el id es inválido, devuelve 404.
    """
    restaurante = await obtener_restaurante_por_slug_servicio(bd, slug_restaurante)
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante

# para actualizar los datos de un restaurante
# NOTA: no se cambia el slug apesar de que venga el na solicitud
@router.put("/id/{id_restaurante}", response_model=RestauranteLeer)
async def actualizar_restaurante(
    id_restaurante: str,
    datos_actualizacion: RestauranteActualizar,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Actualiza un restaurante por id.
    El slug no se modifica aunque venga en el body.
    """
    restaurante = await actualizar_restaurante_servicio(
        bd,
        id_restaurante=id_restaurante,
        datos_actualizacion=datos_actualizacion,
    )
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante

# el endpoint para cambiar el estado para que no tengamos que eliminarlo
@router.patch("/id/{id_restaurante}/activo", response_model=RestauranteLeer)
async def cambiar_estado_activo_restaurante(
    id_restaurante: str,
    estado: EstadoActivo,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Cambia el estado 'activo' de un restaurante (true/false).
    """
    restaurante = await cambiar_estado_activo_restaurante_servicio(
        bd,
        id_restaurante=id_restaurante,
        activo=estado.activo,
    )
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante
