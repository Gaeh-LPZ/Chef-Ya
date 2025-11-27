# backend/app/routers/ubicacion.py
from fastapi import APIRouter, HTTPException, status
from schemas.ubicacion import UbicacionValidada
from typing import List 
from services.ubicacion_service import validar_direccion_servicio, buscar_direcciones_servicio

router = APIRouter(prefix="/ubicacion", tags=["Ubicacion"])

@router.get("/validar", response_model=UbicacionValidada)
async def validar_ubicacion(q: str):
    """
    Valida una dirección y devuelve coordenadas y detalles formateados.
    """
    resultado = await validar_direccion_servicio(q)
    
    if not resultado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la dirección especificada."
        )
    
    return resultado

@router.get("/buscar", response_model=List[UbicacionValidada])
async def buscar_ubicacion(q: str):
    """
    Devuelve una lista de sugerencias de ubicación.
    """
    return await buscar_direcciones_servicio(q)