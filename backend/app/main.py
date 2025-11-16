from fastapi import FastAPI, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from routers.restaurantes import router as router_restaurantes
from routers.auth import router as router_auth
from db.mongo import (
    conectar_a_mongo,
    cerrar_conexion_mongo,
    obtener_bd,
)

app = FastAPI(title="ChefYa API", version="1.0")

@app.on_event("startup")
async def al_iniciar():
    await conectar_a_mongo(app)


@app.on_event("shutdown")
async def al_apagar():
    await cerrar_conexion_mongo(app)

# comprobamos el estado de la conexion
@app.get("/health", tags=["health"])
async def verificar_salud(bd: AsyncIOMotorDatabase = Depends(obtener_bd)):
    """Endpoint simple para comprobar que la API y la BD responden."""
    await bd.command("ping")
    return {"ok": True}

# cargamos la rutas generadas de los restaurantes
app.include_router(router_restaurantes)

# cargamos el endpoint de sesion
app.include_router(router_auth)