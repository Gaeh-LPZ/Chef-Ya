from datetime import datetime, timedelta
from typing import Optional
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from motor.motor_asyncio import AsyncIOMotorDatabase
from jose import jwt, JWTError
from db.mongo import obtener_bd
from schemas.usuario import UsuarioLeer

SECRET_KEY = "CAMBIA_ESTA_CLAVE_SUPER_SECRETA"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

NOMBRE_COLECCION_USUARIOS = "usuarios"

security = HTTPBearer()

async def obtener_usuario_actual(
    credenciales = Depends(security),
    bd: AsyncIOMotorDatabase = Depends(obtener_bd),
):
    """
    Lee el Authorization: Bearer <token_app>,
    valida el JWT y devuelve el documento de usuario.
    """
    token = credenciales.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
        )

    usuario_id: str | None = payload.get("sub")
    if usuario_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token sin sub",
        )

    try:
        oid = ObjectId(usuario_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Id de usuario inválido en el token",
        )

    usuario_doc = await bd[NOMBRE_COLECCION_USUARIOS].find_one({"_id": oid})
    if not usuario_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado",
        )

    return _mapear_doc_a_usuario_leer(usuario_doc)



async def verificar_token_google(id_token: str) -> Optional[dict]:
    """
    por el momento solo simulamos pero aquí en deberíamos verificar el id_token con Google:
      - firma
      - expiración
      - aud, iss y asis
    """
    try:
        partes = id_token.split("|")
        google_id = partes[0]
        correo = partes[1]
        nombre = partes[2]
    except Exception:
        return None

    return {
        "sub": google_id,
        "email": correo,
        "name": nombre,
    }


async def login_con_google_servicio(
    bd: AsyncIOMotorDatabase,
    id_token: str,
) -> Optional[tuple[str, UsuarioLeer]]:
    """
    Verifica el token de Google, busca o crea el usuario en Mongo
    y devuelve el tocken para que podamos usar posteriormente
    """
    datos_google = await verificar_token_google(id_token)
    if not datos_google:
        return None

    google_id = datos_google["sub"]
    correo = datos_google["email"]
    nombre = datos_google["name"]

    # buscar usuario por googleId
    usuario_doc = await bd[NOMBRE_COLECCION_USUARIOS].find_one({"googleId": google_id})

    ahora = datetime.utcnow()

    if not usuario_doc:
        # crear nuevo usuario
        usuario_nuevo = {
            "googleId": google_id,
            "nombre": nombre,
            "correo": correo,
            "telefono": None,
            "direcciones": [],
            "creadoEn": ahora,
            "actualizadoEn": ahora,
        }
        resultado = await bd[NOMBRE_COLECCION_USUARIOS].insert_one(usuario_nuevo)
        usuario_doc = await bd[NOMBRE_COLECCION_USUARIOS].find_one(
            {"_id": resultado.inserted_id}
        )
    else:
        await bd[NOMBRE_COLECCION_USUARIOS].update_one(
            {"_id": usuario_doc["_id"]},
            {
                "$set": {
                    "nombre": nombre,
                    "correo": correo,
                    "actualizadoEn": ahora,
                }
            },
        )

    usuario_leer = _mapear_doc_a_usuario_leer(usuario_doc)

    token_app = _crear_token_acceso(usuario_leer)

    return token_app, usuario_leer


def _crear_token_acceso(usuario: UsuarioLeer) -> str:
    """
    Creamos un JWT propio de la app con googleId y user_id.
    """
    to_encode = {
        "sub": usuario.id,
        "googleId": usuario.googleId,
        "correo": usuario.correo,
    }
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def _mapear_doc_a_usuario_leer(doc: dict) -> UsuarioLeer:
    direcciones = []
    for d in doc.get("direcciones", []):
        direcciones.append(
            {
                "etiqueta": d.get("etiqueta", ""),
                "calle": d.get("calle", ""),
                "ciudad": d.get("ciudad", ""),
                "estado": d.get("estado", ""),
                "cp": d.get("cp"),
                "geo": {
                    "lat": d.get("geo", {}).get("lat", 0.0),
                    "lng": d.get("geo", {}).get("lng", 0.0),
                },
            }
        )

    return UsuarioLeer(
        id=str(doc["_id"]),
        googleId=doc["googleId"],
        nombre=doc.get("nombre", ""),
        correo=doc.get("correo", ""),
        telefono=doc.get("telefono"),
        direcciones=direcciones,
    )
