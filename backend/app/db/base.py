# app/db/base.py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    """Base ORM pour tous les modèles SQLAlchemy."""
    pass
