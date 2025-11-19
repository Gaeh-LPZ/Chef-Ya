from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from schemas.restaurante import RestauranteCrear, RestauranteLeer, EstadoActivo, RestauranteActualizar, RestaurantesPorCategorias
from schemas.usuario import UsuarioLeer
from services.restaurante_service import (
    crear_restaurante_servicio,
    listar_restaurantes_por_categorias_servicio,
    listar_restaurantes_servicio,
    obtener_restaurante_por_id_servicio,
    obtener_restaurante_por_slug_servicio,
    actualizar_restaurante_servicio,
    cambiar_estado_activo_restaurante_servicio,
    obtener_restaurantes_por_categoria_servicio,
    buscar_restaurantes_servicio,       
    filtrar_restaurantes_servicio,    
)
from services.auth_service import obtener_usuario_actual

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
    lista los restaurantes
    """
    restaurantes = await listar_restaurantes_servicio(bd, solo_activos=solo_activos)
    return restaurantes


@router.get("/{id_restaurante}", response_model=RestauranteLeer,)
async def obtener_restaurante(
    id_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un restaurante por su id.
    Si no existe o el id es inválido, devuelve 404.
    """

    restaurante = await obtener_restaurante_por_id_servicio(bd, id_restaurante)
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante

@router.get("/buscar", response_model=List[RestauranteLeer])
async def buscar_restaurantes(
    q: str,
    solo_activos: bool = True,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Busca restaurantes por texto (nombre, descripción o slug).
    """
    restaurantes = await buscar_restaurantes_servicio(bd, q, solo_activos=solo_activos)
    return restaurantes


@router.get("/filtrar", response_model=List[RestauranteLeer])
async def filtrar_restaurantes(
    rating_min: float | None = None,
    tiempo_max: int | None = None,
    costo_envio_max: float | None = None,
    solo_activos: bool = True,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Filtra restaurantes por:
    - rating mínimo (rating_min)
    - tiempo máximo de entrega en minutos (tiempo_max)
    - costo de envío máximo (costo_envio_max)
    """
    restaurantes = await filtrar_restaurantes_servicio(
        bd,
        rating_min=rating_min,
        tiempo_max=tiempo_max,
        costo_envio_max=costo_envio_max,
        solo_activos=solo_activos,
    )
    return restaurantes


@router.get("/slug/{slug_restaurante}", response_model=RestauranteLeer,)
async def obtener_restaurante_slug(
    slug_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un restaurante por su slug, si no existe o el slug es inválido, devuelve 404.
    """
    restaurante = await obtener_restaurante_por_slug_servicio(bd, slug_restaurante)
    if not restaurante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return restaurante

@router.post(
    "/por-categorias",
    response_model=List[RestauranteLeer],
    summary="Listar restaurantes por categorías",
)
async def listar_restaurantes_por_categorias_endpoint(
    body: RestaurantesPorCategorias,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> List[RestauranteLeer]:
    """
    Recibe una lista de categorías (slugs) y devuelve
    todos los restaurantes que tengan al menos una de ellas.
    """
    return await listar_restaurantes_por_categorias_servicio(
        bd,
        categorias=body.categorias,
    )

@router.get("/categoria/{categoria_resturante}", response_model=List[RestauranteLeer],)
async def obtener_restaurantes_categoria(
    categoria_restaurante = str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    lista los restaurantes por categoria
    """
    restaurantes = await obtener_restaurantes_por_categoria_servicio(bd, categoria_restaurante)
    return restaurantes


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


# para actualizar los datos de un restaurante
# NOTA: no se cambia el slug apesar de que venga en la solicitud
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