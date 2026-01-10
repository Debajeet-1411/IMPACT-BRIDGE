from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime
from enum import Enum

class Role(str, Enum):
    NGO = "NGO"
    COMPANY = "COMPANY"
    ADMIN = "ADMIN"

class UserBase(BaseModel):
    email: EmailStr
    role: Role

class UserCreate(UserBase):
    password: str
    name: str # For profile creation

class ProfileBase(BaseModel):
    name: str
    bio: Optional[str] = None
    location: Optional[str] = None
    
    # Extended Profile Fields
    organization_type: Optional[str] = None
    capacity: Optional[str] = None
    urgency_level: Optional[int] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    description: Optional[str] = None
    accepted_donation_types: Optional[List[str]] = None
    
    metadata_json: Optional[Any] = None

class ProfileUpdate(ProfileBase):
    pass

class Profile(ProfileBase):
    id: str
    user_id: str
    is_verified: bool

    class Config:
        from_attributes = True

class User(UserBase):
    id: str
    is_active: bool
    created_at: datetime
    profile: Optional[Profile] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    role: str
    name: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
