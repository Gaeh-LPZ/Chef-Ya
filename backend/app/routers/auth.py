from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorDatabase

from db.mongo import obtener_bd
from services.auth_service import login_con_google_servicio
from schemas.usuario import UsuarioLeer

router = APIRouter(prefix="/auth", tags=["Auth"])


class GoogleLoginRequest(BaseModel):
    id_token: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioLeer


@router.post("/google", response_model=TokenResponse)
async def login_google(
    datos: GoogleLoginRequest,
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Login con Google:
    - verifica el id_token (por ahora simulado),
    - busca/crea usuario,
    - devuelve token propio + datos de usuario.
    """
    resultado = await login_con_google_servicio(bd, datos.id_token)
    if not resultado:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo validar el token de Google",
        )

    token_app, usuario = resultado
    return TokenResponse(access_token=token_app, usuario=usuario)
