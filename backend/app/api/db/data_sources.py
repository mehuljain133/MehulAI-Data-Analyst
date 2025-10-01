from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .base_class import Base


class DataSources(Base):
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, autoincrement=True,
                index=True)  # Single primary key
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(50), index=True)  # Changed name to String
    type = Column(String(50))
    connection_url = Column(String(400), nullable=True, unique=True)
    table_name = Column(String(400), nullable=True, unique=True)
    created_at = Column("created_at", DateTime, default=datetime.utcnow)

    # Add this relationship
    user = relationship("User", back_populates="data_sources")
    conversations = relationship("Conversations", back_populates="data_source")
