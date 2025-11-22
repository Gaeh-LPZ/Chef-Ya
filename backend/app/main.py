from fastapi import FastAPI, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi.middleware.cors import CORSMiddleware
from routers.restaurantes import router as router_restaurantes
from routers.auth import router as router_auth
from routers.categorias import router as router_categorias
from routers.usuarios import router as router_usuarios
from routers.carritos import router as router_carritos
from db.mongo import (
    conectar_a_mongo,
    cerrar_conexion_mongo,
    obtener_bd,
)

app = FastAPI(title="ChefYa API", version="1.0")

#origenes que permiten lectura agregen el suyo donde les abra live server la pagina
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://gaeh-lpz.github.io"  # <-- ¡IMPORTANTE! Agrega esta línea
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# cargamos las rutas generadas de los retaurantes
app.include_router(router_categorias)

# cargamos rutas de usuarios
app.include_router(router_usuarios)

# cargamos rutas de carritos
app.include_router(router_carritos)