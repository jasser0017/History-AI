
import uuid
from sqlalchemy import Column, String, Text, DateTime, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.types import JSON
from app.db.base import Base
from app.core.config import settings

def _keywords_type():
    return ARRAY(String) if settings.is_postgres() else JSON

class Card(Base):
    __tablename__ = "cards"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(300), nullable=False, index=True)
    content_md = Column(Text, nullable=False)
    keywords = Column(_keywords_type(), nullable=False, default=list)  
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
