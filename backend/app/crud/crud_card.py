
from __future__ import annotations

from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.db.models import Card


def create_card(db: Session, *, title: str, content_md: str, keywords: list[str]) -> Card:
    obj = Card(title=title, content_md=content_md, keywords=keywords or [])
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_card(db: Session, card_id: str) -> Optional[Card]:
    return db.get(Card, card_id)


def list_cards(db: Session, q: Optional[str] = None) -> List[Card]:
    stmt = select(Card)
    if q:
        q_norm = f"%{q.lower()}%"
        stmt = stmt.where(func.lower(Card.title).like(q_norm))
    stmt = stmt.order_by(Card.created_at.desc())
    return list(db.execute(stmt).scalars().all())
