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
    crea una nueva categoria en base a nombre ingresado y devuelve el slug generado
    """
    # para que podamos modificarlo
    documento = CategoriaCrear().dict()

    # generamos el slug unico
    documento["nombre"] = nombre_categoria
    oslug = generar_slug(nombre_categoria)
    uslug =await _asegurar_slug_unico(bd,oslug,NOMBRE_COLECCION)

    documento["slug"] = uslug
   
    # enviamos los datos y si se realiza correctamente la insercion devuelve el slug generado
    resultado = await bd[NOMBRE_COLECCION].insert_one(documento)
    dslug = await bd[NOMBRE_COLECCION].find_one({"_id": resultado.inserted_id})
    return str(dslug["slug"])

