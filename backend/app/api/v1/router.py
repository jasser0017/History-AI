from fastapi import APIRouter
from .endpoints import cards, ai

api_router = APIRouter()
api_router.include_router(cards.router, tags=["cards"])
api_router.include_router(ai.router, tags=["ai"])
