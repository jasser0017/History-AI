
from __future__ import annotations

import os
from functools import lru_cache
from typing import Literal, Optional

from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Charger .env en dev/local
load_dotenv()

LogLevel = Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
EnvName = Literal["dev", "test", "prod"]


class Settings(BaseModel):
    """Configuration centrale de l'application."""

    # --- App ---
    app_name: str = Field(default="History AI Wiki")
    app_version: str = Field(default="0.1.0")
    app_env: EnvName = Field(default=os.getenv("APP_ENV", "dev"))
    api_v1_prefix: str = Field(default=os.getenv("API_V1_PREFIX", "/v1"))

    # --- CORS ---
    cors_origins: str = Field(
        default=os.getenv("CORS_ORIGINS"),
        description="Liste séparée par des virgules",
    )
    allow_credentials: bool = True
    allow_methods: str = "*"
    allow_headers: str = "*"

    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    # --- Base de données ---
    database_url: str = Field(
        default=os.getenv("DATABASE_URL",)
    )
    db_pool_size: int = int(os.getenv("DB_POOL_SIZE"))
    db_max_overflow: int = int(os.getenv("DB_MAX_OVERFLOW"))
    db_pool_timeout: int = int(os.getenv("DB_POOL_TIMEOUT"))
    db_echo: bool = os.getenv("DB_ECHO", "0") in {"1", "true", "True"}

    def is_sqlite(self) -> bool:
        url = self.database_url or ""
        return url.startswith("sqlite")

    def is_postgres(self) -> bool:
        url = self.database_url or ""
        return url.startswith("postgresql")

    def sqlalchemy_connect_args(self) -> dict:
        # SQLite en mode fichier a besoin de ce flag
        return {"check_same_thread": False} if self.is_sqlite() else {}

    def sqlalchemy_engine_kwargs(self) -> dict:
        kwargs = {"echo": self.db_echo, "pool_pre_ping": True}
        if self.is_postgres():
            kwargs.update(
                {
                    "pool_size": self.db_pool_size,
                    "max_overflow": self.db_max_overflow,
                    "pool_timeout": self.db_pool_timeout,
                }
            )
        return kwargs

    # --- IA / Gemini ---
    gemini_api_key: Optional[str] = os.getenv("GEMINI_API_KEY")
    gemini_model: str = os.getenv("GEMINI_MODEL")
    gemini_timeout_s: int = int(os.getenv("GEMINI_TIMEOUT_S"))

    def gemini_enabled(self) -> bool:
        return bool(self.gemini_api_key)

    # --- Logs & pagination ---
    debug: bool = os.getenv("DEBUG", "0") in {"1", "true", "True"}
    log_level: LogLevel = (os.getenv("LOG_LEVEL", "INFO") or "INFO").upper()
    default_page_size: int = int(os.getenv("DEFAULT_PAGE_SIZE", "20"))
    max_page_size: int = int(os.getenv("MAX_PAGE_SIZE", "100"))


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Singleton simple. En tests: get_settings.cache_clear() pour relire .env."""
    return Settings()

settings = get_settings()
'''
if __name__ == "__main__":
    settings=Settings()
    print(settings.app_env)
    print(settings.database_url)
    print(settings.cors_origins_list())
    print(settings.is_sqlite(), settings.is_postgres())
    print(settings.sqlalchemy_connect_args())
    print(settings.sqlalchemy_engine_kwargs())
    print("Gemini enabled?", settings.gemini_enabled())

    '''