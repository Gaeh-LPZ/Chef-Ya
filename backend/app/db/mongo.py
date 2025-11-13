from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from fastapi import Request
import os

# Variables de configuración de mongo
MONGO_HOST = os.getenv("MONGO_HOST", "mongodb")
MONGO_PORT = os.getenv("MONGO_PORT", "27017")
MONGO_USER = os.getenv("MONGO_USER", "root")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD", "example")
MONGO_DB = os.getenv("MONGO_DB", "chefya")

#conexion a mongo
URI_MONGO = (
    f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@"
    f"{MONGO_HOST}:{MONGO_PORT}/?authSource=admin"
)

# funciones basicas de conexion para el inicio
async def conectar_a_mongo(aplicacion):
    """Crear el cliente de Mongo y probar la conexión."""
    aplicacion.state.cliente_mongo = AsyncIOMotorClient(URI_MONGO)
    aplicacion.state.base_datos_mongo = aplicacion.state.cliente_mongo[MONGO_DB]
    await aplicacion.state.base_datos_mongo.command("ping")


async def cerrar_conexion_mongo(aplicacion):
    """Cerrar la conexión con Mongo al apagar la app."""
    cliente: AsyncIOMotorClient | None = getattr(aplicacion.state, "cliente_mongo", None)
    if cliente:
        cliente.close()


def obtener_bd(solicitud: Request) -> AsyncIOMotorDatabase:
    """Dependencia para obtener la base de datos en los endpoints o servicios."""
    return solicitud.app.state.base_datos_mongo