from app.config.db_config import DB
from app.config.env import DATABASE_URL
from sqlalchemy.orm import Session
from typing import Tuple

db = DB(DATABASE_URL)


def get_db() -> DB:
    try:
        yield db
    finally:
        # session.close()
        pass
