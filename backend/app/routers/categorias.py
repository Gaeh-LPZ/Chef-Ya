from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from services.categoria_service import crear_categoria_servicio
from db.mongo import obtener_bd
from schemas.categoria import CategoriaCrear

router = APIRouter(prefix="/categorias", tags=["Categorias"],)

@router.post("/", response_model=str, status_code=status.HTTP_201_CREATED,)
async def crear_categoria(
    nombre_categoria: str,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    crea una nueva categoria en la base de datos y regresa el id generado
    """
    nuevo_id = await crear_categoria_servicio(bd, nombre_categoria)
    return nuevo_id