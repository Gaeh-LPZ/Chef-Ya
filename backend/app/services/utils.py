import re
import unicodedata


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
