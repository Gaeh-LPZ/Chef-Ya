from pydantic import BaseModel
from typing import Optional, List

class CategoriaBase(BaseModel):
    slug: Optional[str] = None
    nombre: Optional[str] = None

class CategoriaLeer(BaseModel):
    nombre: str

class CategoriaCrear(CategoriaBase):
    pass