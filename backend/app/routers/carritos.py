# routers/carrito.py
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from schemas.carrito import (
    CarritoLeer,
    CarritoItemCrear,
    CarritoActualizarItem,
    CarritoAplicarCuponRequest,
    CarritoModificarCantidad,
)
from services.carrito_service import (
    modificar_cantidad_item_carrito_servicio,
    obtener_o_crear_carrito_por_usuario_servicio,
    obtener_carrito_por_id_servicio,
    agregar_item_carrito_servicio,
    actualizar_item_carrito_servicio,
    eliminar_item_carrito_servicio,
    vaciar_carrito_servicio,
    aplicar_cupon_carrito_servicio,
)

router = APIRouter(prefix="/carritos", tags=["Carritos"])


@router.get("/usuario/{id_usuario}", response_model=CarritoLeer)
async def obtener_o_crear_carrito_por_usuario(
    id_usuario: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Obtiene el carrito del usuario (lo crea vacío si no existe).
    """
    carrito = await obtener_o_crear_carrito_por_usuario_servicio(bd, id_usuario)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario inválido o carrito no disponible",
        )
    return carrito


@router.get("/{id_carrito}", response_model=CarritoLeer)
async def obtener_carrito_por_id(
    id_carrito: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Obtiene un carrito por su id.
    """
    carrito = await obtener_carrito_por_id_servicio(bd, id_carrito)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito no encontrado",
        )
    return carrito


@router.post("/{id_carrito}/items", response_model=CarritoLeer, status_code=status.HTTP_201_CREATED)
async def agregar_item_carrito(
    id_carrito: str,
    item: CarritoItemCrear,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Agrega un item al carrito por id_carrito.
    No crea nuevos carritos.
    """
    carrito = await agregar_item_carrito_servicio(bd, id_carrito, item)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito no encontrado o datos inválidos",
        )
    return carrito


@router.put("/{id_carrito}/items/{indice}", response_model=CarritoLeer)
async def actualizar_item_carrito(
    id_carrito: str,
    indice: int,
    datos: CarritoActualizarItem,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Actualiza la cantidad de un item del carrito.
    """
    carrito = await actualizar_item_carrito_servicio(bd, id_carrito, indice, datos.cantidad)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito o item no encontrado",
        )
    return carrito


@router.delete("/{id_carrito}/items/{indice}", response_model=CarritoLeer)
async def eliminar_item_carrito(
    id_carrito: str,
    indice: int,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Elimina un item del carrito por índice.
    """
    carrito = await eliminar_item_carrito_servicio(bd, id_carrito, indice)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito o item no encontrado",
        )
    return carrito


@router.delete("/{id_carrito}", response_model=CarritoLeer)
async def vaciar_carrito(
    id_carrito: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Vacía por completo el carrito.
    """
    carrito = await vaciar_carrito_servicio(bd, id_carrito)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito no encontrado",
        )
    return carrito


@router.post("/{id_carrito}/cupon", response_model=CarritoLeer)
async def aplicar_cupon_carrito(
    id_carrito: str,
    datos: CarritoAplicarCuponRequest,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Aplica un cupón al carrito por id_carrito.
    """
    carrito = await aplicar_cupon_carrito_servicio(bd, id_carrito, datos.codigo)
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Carrito o cupón inválido",
        )
    return carrito

@router.patch("/{id_carrito}/items/{indice}", response_model=CarritoLeer)
async def modificar_cantidad_item_carrito(
    id_carrito: str,
    indice: int,
    datos: CarritoModificarCantidad,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Modifica la cantidad de un item sumando/restando un delta.
    Ejemplo: { "delta": 1 } o { "delta": -1 }
    """
    carrito = await modificar_cantidad_item_carrito_servicio(
        bd,
        id_carrito,
        indice,
        datos.delta,
    )
    if not carrito:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito o item no encontrado",
        )
    return carrito
