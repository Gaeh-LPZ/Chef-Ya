# backend/app/routers/ubicacion.py
from fastapi import APIRouter, HTTPException, status
from schemas.ubicacion import UbicacionValidada
from services.ubicacion_service import validar_direccion_servicio

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