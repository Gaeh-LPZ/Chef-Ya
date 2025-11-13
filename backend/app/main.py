from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
import os
from p import prueba

app = FastAPI(title="ChefYa API")

# cargamos las variables
MONGO_HOST = os.getenv("MONGO_HOST", "mongodb")
MONGO_PORT = os.getenv("MONGO_PORT", "27017")
MONGO_USER = os.getenv("MONGO_USER", "root")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD", "example")
MONGO_DB = os.getenv("MONGO_DB", "chefya")

# aqui hacemos la conexión
MONGO_URI = f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_HOST}:{MONGO_PORT}/?authSource=admin"

# estas son las variablse globales para la conexion
client: AsyncIOMotorClient | None = None
db = None

@app.on_event("startup")
async def startup():
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB]
    await db.command("ping")

@app.on_event("shutdown")
async def shutdown():
    if client:
        client.close()

# verificamos la conexion de la base de datos
@app.get("/health",tags=["Health"])
async def health():
    await db.command("ping")
    return {"ok": True}

@app.get("/principal")
def pruebe():
    return prueba()

