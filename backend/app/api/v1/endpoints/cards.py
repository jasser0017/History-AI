from __future__ import annotations

from typing import Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, Query, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.card import CardOut
from app.crud import crud_card
from app.services.card_service import create_card_with_ai

router = APIRouter()

@router.get("/cards", response_model=list[CardOut])
def list_cards(
    q: Optional[str] = Query(default=None, description="Filtre (contient) sur le titre"),
    db: Session = Depends(get_db),
):
    return crud_card.list_cards(db, q)


@router.get("/cards/{card_id}", response_model=CardOut)
def get_card(
    card_id: str,
    db: Session = Depends(get_db),
):
    obj = crud_card.get_card(db, card_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Card not found")
    return obj


@router.post("/cards", response_model=CardOut)
async def create_card_endpoint(
    title: str = Form(..., description="Titre de la carte"),
    system_prompt: Optional[str] = Form(None, description="Consignes système IA (optionnel)"),
    topics: Optional[str] = Form(None, description="CSV ex: Gaza, Printemps arabe"),
    db: Session = Depends(get_db),
):
    # Parse topics CSV -> list[str]
    topics_list = [t.strip() for t in topics.split(",")] if topics else None

    card = await create_card_with_ai(
        db=db,
        title=title,
        system_prompt=system_prompt,
        topics=topics_list,
    )
    return card
