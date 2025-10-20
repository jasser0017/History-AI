
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.router import api_router
from app.db.base import Base
from app.db.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[*settings.cors_origins_list()],
    allow_credentials=True,
    allow_methods=[settings.allow_methods],
    allow_headers=[settings.allow_headers],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


