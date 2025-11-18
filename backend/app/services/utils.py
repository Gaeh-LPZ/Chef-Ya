import re
import unicodedata
from motor.motor_asyncio import AsyncIOMotorDatabase

def generar_slug(texto: str) -> str:
    """
    funcion para generar el slug en caso de que no se envie,
    asi mantenemos coherencia.
    """
    # primero lo pasamos a minusculas
    texto = texto.lower().strip()

    # luego le quitamos los acentos
    texto = (
        unicodedata
        .normalize("NFKD", texto)
        .encode("ascii", "ignore")
        .decode("ascii")
    )

    # remplazamos cualquier cosa que no sean numeros o letras por guines
    # para mantener la coherencia
    texto = re.sub(r"[^a-z0-9]+", "-", texto)

    # quitar guiones al inicio y al finasl
    texto = texto.strip("-")

    return texto

#importente!, debemos asegurar que el slug no cambie al actualizar el nombre
async def _asegurar_slug_unico(bd: AsyncIOMotorDatabase, slug_base: str,NOMBRE_COLECCION: str) -> str:
    """
    funcion interna que nos permite garantizar unicidad en los slugs
    devuelve un slug unico
    """
    slug = slug_base
    contador = 1

    while True:
        existe = await bd[NOMBRE_COLECCION].find_one({"slug": slug})
        if not existe:
            return slug

        contador += 1
        slug = f"{slug_base}-{contador}"
