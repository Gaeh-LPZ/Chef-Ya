# backend/app/services/ubicacion_service.py
import httpx
from typing import Optional
from schemas.ubicacion import UbicacionValidada

async def validar_direccion_servicio(query: str) -> Optional[UbicacionValidada]:
    if not query:
        return None

    url = "https://nominatim.openstreetmap.org/search"
    
    # --- CAMBIO IMPORTANTE AQUÍ ---
    # Nominatim pide un User-Agent que los identifique. 
    # Poner un correo (aunque sea inventado para desarrollo) ayuda a que no bloqueen.
    headers = {
        "User-Agent": "ChefYa-ProyectoEscolar/1.0 (galob567@gmail.com)",
        "Referer": "http://127.0.0.1" 
    }
    # ------------------------------
    
    params = {
        "q": query,
        "format": "json",
        "addressdetails": 1,
        "limit": 1,
        "countrycodes": "mx"
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, params=params, headers=headers)
            # Si sigue fallando, lanzará excepción aquí y lo veremos en el log
            resp.raise_for_status()
            
            data = resp.json()
            if not data:
                return None

            resultado = data[0]
            direccion = resultado.get("address", {})

            # backend/app/services/ubicacion_service.py

            return UbicacionValidada(
                direccion_completa=resultado.get("display_name"),
                calle=direccion.get("road") or direccion.get("pedestrian") or direccion.get("house_number") or direccion.get("suburb"),
                ciudad=(
                    direccion.get("city") or 
                    direccion.get("town") or 
                    direccion.get("municipality") or 
                    direccion.get("county") or 
                    direccion.get("village") or 
                    direccion.get("hamlet")
                ),
                estado=direccion.get("state"),
                cp=direccion.get("postcode", "S/CP"),
                lat=float(resultado.get("lat")),
                lon=float(resultado.get("lon"))
            )

        except Exception as e:
            # Este print es el que viste en los logs
            print(f"Error consultando geocoding: {e}")
            return None