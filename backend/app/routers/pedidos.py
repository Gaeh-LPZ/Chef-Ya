
from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd  # ajusta el import según tu proyecto

from schemas.pedido import (
    PedidoCrear,
    PedidoLeer,
    PedidoCambiarEstado,
)
from services.pedido_service import (
    crear_pedido_servicio,
    obtener_pedido_por_id_servicio,
    listar_pedidos_por_usuario_servicio,
    cambiar_estado_pedido_servicio,
    simular_ciclo_pedido
)

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"],
)


@router.post(
    "/",
    response_model=PedidoLeer,
    status_code=status.HTTP_201_CREATED,
    summary="Crear pedido",
)
async def crear_pedido_endpoint(
    datos_pedido: PedidoCrear,
    background_tasks: BackgroundTasks, # <--- INYECTAR AQUÍ
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> PedidoLeer:
    pedido = await crear_pedido_servicio(bd, datos_pedido)
    background_tasks.add_task(
        simular_ciclo_pedido, 
        bd, 
        pedido.id, 
        datos_pedido.usuarioId
    )
    
    return pedido


@router.get(
    "/{id_pedido}",
    response_model=PedidoLeer,
    summary="Obtener pedido por id",
)
async def obtener_pedido_endpoint(
    id_pedido: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> PedidoLeer:
    pedido = await obtener_pedido_por_id_servicio(bd, id_pedido)
    if not pedido:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pedido no encontrado",
        )
    return pedido


@router.get(
    "/usuario/{id_usuario}",
    response_model=List[PedidoLeer],
    summary="Listar pedidos por usuario",
    description="Lista los pedidos de un usuario, opcionalmente filtrando por estado.",
)
async def listar_pedidos_usuario_endpoint(
    id_usuario: str,
    limite: int = 50,
    saltar: int = 0,
    estado: Optional[str] = None,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> List[PedidoLeer]:
    pedidos = await listar_pedidos_por_usuario_servicio(
        bd,
        id_usuario=id_usuario,
        limite=limite,
        saltar=saltar,
        estado=estado,
    )
    return pedidos


@router.patch(
    "/{id_pedido}/estado",
    response_model=PedidoLeer,
    summary="Cambiar estado de un pedido",
    description="Actualiza el estado del pedido y agrega un registro a la cronología.",
)
async def cambiar_estado_pedido_endpoint(
    id_pedido: str,
    datos_estado: PedidoCambiarEstado,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
) -> PedidoLeer:
    pedido = await cambiar_estado_pedido_servicio(bd, id_pedido, datos_estado)
    if not pedido:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pedido no encontrado o índice inválido",
        )
    return pedido