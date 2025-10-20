
from __future__ import annotations
import asyncio
from sqlalchemy.orm import Session
from app.services.ai_service import generate_blog
from app.crud.crud_card import create_card


async def create_card_with_ai(
    db: Session,
    *,
    title: str,
    system_prompt: str | None,
    topics: list[str] | None,
):
    """
    Pipeline de création:
      1) Extraire le texte du PDF (si fourni)
      2) Générer le contenu (Markdown) + keywords via IA (ou fallback)
      3) Persister en DB et renvoyer l'objet Card
    """
    content_md, keywords = generate_blog(title, system_prompt, topics)
    card = create_card(db, title=title, content_md=content_md, keywords=keywords)
    return card

'''
async def main():
    from app.db.session import engine, SessionLocal
    from app.db.base import Base

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    p = await create_card_with_ai(
        db, title="war of 1967", system_prompt="", topics=[]
    )

    print(p)



if __name__ == "__main__":
    asyncio.run(main())

    '''