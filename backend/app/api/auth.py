from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.core import security
from datetime import timedelta

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/login", response_model=user_schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    # This is a temporary login for development without Google OAuth
    user = db.query(user_models.User).filter(user_models.User.email == form_data.username).first()
    if not user:
        # Auto-create user for testing if doesn't exist? (NOT FOR PRODUCTION)
        user = user_models.User(email=form_data.username, role=user_models.Role.NGO)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": user.id,
        "role": user.role,
        "name": user.profile.name if user.profile else None
    }

@router.post("/signup", response_model=user_schemas.Token)
def signup(user_in: user_schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(user_models.User).filter(user_models.User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Create User
    # Note: Password is NOT hashed/stored in this DB schema (Mock Auth).
    # In production, use passlib to hash user_in.password.
    user = user_models.User(email=user_in.email, role=user_in.role)
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create Profile
    profile = user_models.Profile(user_id=user.id, name=user_in.name)
    db.add(profile)
    db.commit()
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": user.id,
        "role": user.role,
        "name": user.profile.name
    }

@router.post("/google", response_model=user_schemas.Token)
def google_auth(payload: dict, db: Session = Depends(get_db)):
    # Placeholder for Google OAuth verification logic
    # In production, verify the ID token from Google
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    
    user = db.query(user_models.User).filter(user_models.User.email == email).first()
    if not user:
        # On first login, we need role selection
        # For now, return a partial token or handle redirection
        user = user_models.User(email=email, role=payload.get("role", user_models.Role.NGO))
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = security.create_access_token(data={"sub": user.email, "role": user.role})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": user.id,
        "role": user.role,
        "name": user.profile.name if user.profile else None
    }
