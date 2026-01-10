from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime
from enum import Enum

class PostType(str, Enum):
    NEED = "NEED"
    AVAILABILITY = "AVAILABILITY"
    UPDATE = "UPDATE"

class PostBase(BaseModel):
    content: str
    type: PostType
    media_url: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostAuthor(BaseModel):
    id: str
    name: str
    is_verified: bool = False
    avatar: Optional[str] = None

class Post(PostBase):
    id: str
    user_id: str
    ai_metadata: Optional[Any] = None
    created_at: datetime
    author: Optional[PostAuthor] = None

    class Config:
        from_attributes = True

class MatchRequestBase(BaseModel):
    post_id: str
    recipient_id: str

class MatchRequestCreate(MatchRequestBase):
    pass

class MatchRequest(MatchRequestBase):
    id: str
    sender_id: str
    status: str
    ai_score: Optional[float] = None
    ai_explanation: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
