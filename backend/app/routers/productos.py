# app/routers/productos.py
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from schemas.producto import (
    ProductoCrear,
    ProductoLeer,
    ProductoActualizar,
)
from services.producto_service import (
    crear_producto_servicio,
    obtener_producto_por_id_servicio,
    listar_productos_por_restaurante_servicio,
    actualizar_producto_servicio,
    eliminar_producto_servicio,
)

router = APIRouter(
    prefix="/productos",
    tags=["Productos"],
)


@router.post(
    "",
    response_model=ProductoLeer,
    status_code=status.HTTP_201_CREATED,
    summary="Crear un producto",
)
async def crear_producto(
    datos: ProductoCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Crea un producto nuevo para un restaurante.
    """
    nuevo_id = await crear_producto_servicio(bd, datos)
    if not nuevo_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="restauranteId inválido",
        )

    producto = await obtener_producto_por_id_servicio(bd, nuevo_id)
    # en teoría no debería ser None justo después de crearlo
    if not producto:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al recuperar el producto recién creado",
        )

    return producto


@router.get(
    "/{id_producto}",
    response_model=ProductoLeer,
    summary="Obtener producto por id",
)
async def obtener_producto(
    id_producto: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Devuelve un producto por su id.
    """
    producto = await obtener_producto_por_id_servicio(bd, id_producto)
    if not producto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado",
        )
    return producto


@router.get(
    "/restaurante/{id_restaurante}",
    response_model=List[ProductoLeer],
    summary="Listar productos de un restaurante",
)
async def listar_productos_por_restaurante(
    id_restaurante: str,
    solo_disponibles: bool = Query(
        True,
        description="Si es true, solo devuelve productos disponibles",
    ),
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Lista los productos de un restaurante.
    """
    productos = await listar_productos_por_restaurante_servicio(
        bd, id_restaurante, solo_disponibles=solo_disponibles
    )
    return productos


@router.put(
    "/{id_producto}",
    response_model=ProductoLeer,
    summary="Actualizar un producto",
)
async def actualizar_producto(
    id_producto: str,
    datos: ProductoActualizar,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Actualiza los datos de un producto.
    """
    actualizado = await actualizar_producto_servicio(bd, id_producto, datos)
    if not actualizado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado o datos sin cambios",
        )

    producto = await obtener_producto_por_id_servicio(bd, id_producto)
    if not producto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado después de actualizar",
        )
    return producto


@router.delete(
    "/{id_producto}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Eliminar un producto",
)
async def eliminar_producto(
    id_producto: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Elimina un producto.
    """
    eliminado = await eliminar_producto_servicio(bd, id_producto)
    if not eliminado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Producto no encontrado",
        )
    # 204 → sin cuerpo
    return
