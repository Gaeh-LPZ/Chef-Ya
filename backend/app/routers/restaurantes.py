from typing import List, Optional
from datetime import datetime, time
from fastapi import APIRouter, Depends, HTTPException, status, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from schemas.restaurante import (
    RestauranteCrear,
    RestauranteLeer,
    EstadoActivo,
    RestauranteActualizar,
    RestaurantesPorCategorias,
    HorarioRestaurante,   # 🔹 NUEVO
)
from schemas.usuario import UsuarioLeer
from services.restaurante_service import (
    crear_restaurante_servicio,
    listar_restaurantes_populares_servicio,
    listar_restaurantes_por_categorias_servicio,
    listar_restaurantes_servicio,
    obtener_restaurante_por_id_servicio,
    obtener_restaurante_por_slug_servicio,
    actualizar_restaurante_servicio,
    cambiar_estado_activo_restaurante_servicio,
    obtener_restaurantes_por_categoria_servicio,
    buscar_restaurantes_servicio,
    filtrar_restaurantes_servicio,
    # 🔹 NUEVOS
    listar_restaurantes_en_servicio_servicio,
    obtener_horario_restaurante_servicio,
)
from services.auth_service import obtener_usuario_actual

router = APIRouter(prefix="/restaurantes", tags=["Restaurantes"])


@router.post("/", response_model=str, status_code=status.HTTP_201_CREATED)
async def crear_restaurante(
    datos_restaurante: RestauranteCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    nuevo_id = await crear_restaurante_servicio(bd, datos_restaurante)
    return nuevo_id


@router.get("/", response_model=List[RestauranteLeer])
async def listar_restaurantes(
    solo_activos: bool = True,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Lista los restaurantes (usa solo el campo 'activo').
    """
    restaurantes = await listar_restaurantes_servicio(bd, solo_activos=solo_activos)
    return restaurantes


@router.get(
    "/en-servicio",
    response_model=List[RestauranteLeer],
    summary="Listar restaurantes que están en servicio ahora",
)
@router.get(
    "/en-servicio",
    response_model=List[RestauranteLeer],
    summary="Listar restaurantes que están en servicio en una fecha/hora dada",
)
async def listar_restaurantes_en_servicio(
    fecha_hora: Optional[str] = Query(
        None,
        description=(
            "Fecha y hora en formato ISO 8601. "
            "Ejemplo: 2025-11-24T09:48:00 o 2025-11-24T09:48:00-06:00"
        ),
    ),
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Si `fecha_hora` viene en la query, se usa esa fecha/hora.
    Si no, se usa la hora actual del servidor.
    """
    momento: Optional[datetime] = None

    if fecha_hora:
        try:
            # Python 3.11+ soporta fromisoformat con offset tipo -06:00
            momento = datetime.fromisoformat(fecha_hora)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "Formato de fecha_hora inválido. "
                    "Usa ISO 8601, ej: 2025-11-24T09:48:00 o 2025-11-24T09:48:00-06:00"
                ),
            )

    # Aquí delegamos toda la lógica al servicio
    return await listar_restaurantes_en_servicio_servicio(bd, momento=momento)



@router.get(
    "/populares",
    response_model=list[RestauranteLeer],
    summary="Listar restaurantes populares",
)
async def listar_restaurantes_populares(
    limite: int = Query(6, ge=1, le=50, description="Número máximo de restaurantes a devolver"),
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    return await listar_restaurantes_populares_servicio(bd, limite=limite)


@router.get("/{id_restaurante}", response_model=RestauranteLeer)
async def obtener_restaurante(
    id_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
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
    restaurantes = await filtrar_restaurantes_servicio(
        bd,
        rating_min=rating_min,
        tiempo_max=tiempo_max,
        costo_envio_max=costo_envio_max,
        solo_activos=solo_activos,
    )
    return restaurantes


@router.get("/slug/{slug_restaurante}", response_model=RestauranteLeer)
async def obtener_restaurante_slug(
    slug_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
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
    return await listar_restaurantes_por_categorias_servicio(
        bd,
        categorias=body.categorias,
    )


@router.get("/categoria/{categoria_resturante}", response_model=List[RestauranteLeer])
async def obtener_restaurantes_categoria(
    categoria_resturante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    restaurantes = await obtener_restaurantes_por_categoria_servicio(bd, categoria_resturante)
    return restaurantes


@router.patch("/id/{id_restaurante}/activo", response_model=RestauranteLeer)
async def cambiar_estado_activo_restaurante(
    id_restaurante: str,
    estado: EstadoActivo,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
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


@router.put("/id/{id_restaurante}", response_model=RestauranteLeer)
async def actualizar_restaurante(
    id_restaurante: str,
    datos_actualizacion: RestauranteActualizar,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
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


# 🔹 NUEVO: endpoint para consultar horario y días de servicio
@router.get(
    "/id/{id_restaurante}/horario",
    response_model=HorarioRestaurante,
    summary="Obtener horario y días de servicio de un restaurante",
)
async def obtener_horario_restaurante(
    id_restaurante: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    info = await obtener_horario_restaurante_servicio(bd, id_restaurante)
    if not info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurante no encontrado",
        )
    return info
