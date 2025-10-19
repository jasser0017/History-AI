from sqlalchemy import inspect,select
from app.db.session import engine,SessionLocal
from app.db.base import Base
from app.db import models
from app.db.models import Card 
from app.crud.crud_card import get_card,create_card
import google.generativeai as genai

def test_engine_connects_and_tables_exist():
    Base.metadata.create_all(bind=engine)

    insp = inspect(engine)
    assert "cards" in insp.get_table_names()
def test_insert_and_read_card():
    db = SessionLocal()
    try:
        print("\n📂 Contenu de la table 'cards':")
        all_cards = db.execute(select(Card)).scalars().all()
        for c in all_cards:
            print(f"- {c.id} | {c.title} | {c.keywords}")
    finally:
        db.close()



        
        