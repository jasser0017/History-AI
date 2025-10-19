from __future__ import annotations

from pydantic import BaseModel, Field


class CopilotIn(BaseModel):
    question: str = Field(..., min_length=3, max_length=2000)
    context: str = Field(..., min_length=1, description="Contenu Markdown complet du billet")


class CopilotOut(BaseModel):
    answer: str = Field(..., min_length=1)


class BiasJudgeIn(BaseModel):
    text: str = Field(..., min_length=1, description="Texte à évaluer (Markdown autorisé)")


class BiasJudgeOut(BaseModel):
    bias_score: float = Field(..., ge=0.0, le=1.0, description="0=neutre, 1=très biaisé")
    explanation: str = Field(..., min_length=1)
