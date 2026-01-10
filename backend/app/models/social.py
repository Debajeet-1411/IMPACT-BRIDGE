from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.database import Base

class PostType(str, Enum):
    NEED = "NEED"
    AVAILABILITY = "AVAILABILITY"
    UPDATE = "UPDATE"

class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    content = Column(String, nullable=False)
    type = Column(String, nullable=False)  # NEED, AVAILABILITY, UPDATE
    media_url = Column(String)
    ai_metadata = Column(JSON)  # extracted intent, urgency, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="posts")
    matches = relationship("MatchRequest", back_populates="post")

class MatchRequest(Base):
    __tablename__ = "match_requests"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    post_id = Column(String, ForeignKey("posts.id"))
    sender_id = Column(String, ForeignKey("users.id"))
    recipient_id = Column(String, ForeignKey("users.id"))
    status = Column(String, default="PENDING")  # PENDING, ACCEPTED, REJECTED
    ai_score = Column(Float)
    ai_explanation = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    post = relationship("Post", back_populates="matches")

class Donation(Base):
    __tablename__ = "donations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    match_id = Column(String, ForeignKey("match_requests.id"))
    status = Column(String, default="COMPLETED")
    impact_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
