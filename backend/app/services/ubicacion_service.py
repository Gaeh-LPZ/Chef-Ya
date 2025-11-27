# backend/app/services/ubicacion_service.py
import httpx
from typing import Optional, List
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
        
async def buscar_direcciones_servicio(query: str) -> List[UbicacionValidada]:
    """
    Busca hasta 5 coincidencias para sugerencias de autocompletado.
    """
    if not query or len(query) < 4: # Mínimo 4 letras para no saturar
        return []

    url = "https://nominatim.openstreetmap.org/search"
    
    headers = {
        "User-Agent": "ChefYa-ProyectoEscolar/1.0 (galob567@gmail.com)",
        "Referer": "http://127.0.0.1" 
    }
    
    # Aquí pedimos 5 resultados en lugar de 1
    params = {
        "q": query,
        "format": "json",
        "addressdetails": 1,
        "limit": 5, 
        "countrycodes": "mx"
    }

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, params=params, headers=headers)
            resp.raise_for_status()
            
            data = resp.json()
            resultados_lista = []

            for resultado in data:
                direccion = resultado.get("address", {})
                
                # Usamos la misma lógica de prioridades que corregimos antes
                ciudad_detectada = (
                    direccion.get("city") or 
                    direccion.get("town") or 
                    direccion.get("municipality") or 
                    direccion.get("county") or 
                    direccion.get("village") or 
                    direccion.get("hamlet")
                )

                item = UbicacionValidada(
                    direccion_completa=resultado.get("display_name"),
                    calle=direccion.get("road") or direccion.get("pedestrian") or direccion.get("house_number") or direccion.get("suburb"),
                    ciudad=ciudad_detectada,
                    estado=direccion.get("state"),
                    cp=direccion.get("postcode", "S/CP"),
                    lat=float(resultado.get("lat")),
                    lon=float(resultado.get("lon"))
                )
                resultados_lista.append(item)
            
            return resultados_lista

        except Exception as e:
            print(f"Error en búsqueda de sugerencias: {e}")
            return []