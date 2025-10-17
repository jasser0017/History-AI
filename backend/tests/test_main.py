from sqlalchemy import inspect,select
from app.db.session import engine,SessionLocal
from app.db.base import Base
from app.db import models
from app.db.models import Card 

def test_engine_connects_and_tables_exist():
    Base.metadata.create_all(bind=engine)

    insp = inspect(engine)
    assert "cards" in insp.get_table_names()
def test_insert_and_read_card():
    db = SessionLocal()
    try:
        card = Card(
            title="Exemple d'événement",
            content_md="# Titre\n\nContenu **Markdown**.",
            keywords=["gaza", "printemps_arabe"],
        )
        db.add(card)
        db.commit()
        db.refresh(card)

        fetched = db.get(Card, card.id)
        assert fetched is not None
        assert fetched.title == "Exemple d'événement"
        assert isinstance(fetched.keywords, list) 
        print("\n📂 Contenu de la table 'cards':")
        all_cards = db.execute(select(Card)).scalars().all()
        for c in all_cards:
            print(f"- {c.id} | {c.title} | {c.keywords}")
    finally:
        db.close()