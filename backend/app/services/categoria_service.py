from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from services.utils import generar_slug,_asegurar_slug_unico

from schemas.categoria import CategoriaCrear

NOMBRE_COLECCION = "categorias"

async def crear_categoria_servicio(
    bd: AsyncIOMotorDatabase,
    nombre_categoria: str,
) -> str:
    """
    Crea una nueva categoría si no existe si ya existe solo devuele el slug
    """
    existente = await bd[NOMBRE_COLECCION].find_one({"nombre": nombre_categoria})
    if existente:
        return str(existente["slug"])

    documento = CategoriaCrear().dict()
    documento["nombre"] = nombre_categoria

    oslug = generar_slug(nombre_categoria)
    uslug = await _asegurar_slug_unico(bd, oslug, NOMBRE_COLECCION)
    documento["slug"] = uslug

    resultado = await bd[NOMBRE_COLECCION].insert_one(documento)
    nueva = await bd[NOMBRE_COLECCION].find_one({"_id": resultado.inserted_id})
    return str(nueva["slug"])