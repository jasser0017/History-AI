from __future__ import annotations

from fastapi import APIRouter
from app.schemas.ai import CopilotIn, CopilotOut, BiasJudgeIn, BiasJudgeOut
from app.services.ai_service import copilot_answer, bias_judge

router = APIRouter()

@router.post("/ai/copilot", response_model=CopilotOut)
def copilot(payload: CopilotIn):
    answer = copilot_answer(payload.question, payload.context)
    return CopilotOut(answer=answer)

@router.post("/ai/bias-judge", response_model=BiasJudgeOut)
def judge(payload: BiasJudgeIn):
    score, explanation = bias_judge(payload.text)
    return BiasJudgeOut(bias_score=score, explanation=explanation)
