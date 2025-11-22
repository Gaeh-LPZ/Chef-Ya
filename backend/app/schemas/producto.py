# app/schemas/producto.py
from typing import List, Optional
from pydantic import BaseModel, Field


class ProductoBase(BaseModel):
    restauranteId: str = Field(
        ...,
        description="ID del restaurante propietario (ObjectId en formato string)",
    )
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    imagen: Optional[str] = None
    disponible: bool = True
    etiquetas: List[str] = []
    categoriaMenu: Optional[str] = Field(
        None, description="Categoría dentro del menú (ej. 'Plato fuerte', 'Bebida')"
    )


class ProductoCrear(ProductoBase):
    """Datos necesarios para crear un producto."""
    pass


class ProductoActualizar(BaseModel):
    """
    Campos opcionales para actualizar un producto.
    Solo se modificarán los campos enviados.
    """
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    imagen: Optional[str] = None
    disponible: Optional[bool] = None
    etiquetas: Optional[List[str]] = None
    categoriaMenu: Optional[str] = None


class ProductoLeer(ProductoBase):
    """Producto tal como se devuelve al frontend."""
    id: str

    class Config:
        orm_mode = True
