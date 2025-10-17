from __future__ import annotations
from typing import List
from pydantic import BaseModel, Field, ConfigDict



class CardBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=300)
    content_md: str = Field(..., min_length=1, description="Contenu Markdown non vide")
    keywords: List[str] = Field(default_factory=list)

class CardOut(CardBase):
    id: str
    #creéation d'un modéle , directement depuis un objet SQLAlchemy
    model_config = ConfigDict(from_attributes=True)

    
class CardCreateRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=300)
    system_prompt: str | None = Field(default=None, max_length=3000)
    topics: list[str] | None = None
