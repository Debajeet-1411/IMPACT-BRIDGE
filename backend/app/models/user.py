from sqlalchemy import Column, String, DateTime, Enum, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.database import Base

class Role(str, Enum):
    NGO = "NGO"
    COMPANY = "COMPANY"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, nullable=False)  # NGO, COMPANY, ADMIN
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False)
    posts = relationship("Post", back_populates="author")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    name = Column(String, nullable=False)
    bio = Column(String)
    location = Column(String)
    metadata_json = Column(JSON)  # capacity, type, etc.
    is_verified = Column(Boolean, default=False)

    user = relationship("User", back_populates="profile")
