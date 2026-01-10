from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.api.auth import oauth2_scheme

router = APIRouter()

@router.get("/{user_id}", response_model=user_schemas.Profile)
def get_profile(user_id: str, db: Session = Depends(get_db)):
    profile = db.query(user_models.Profile).filter(user_models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

from jose import jwt, JWTError
from app.core.security import SECRET_KEY, ALGORITHM

@router.put("/{user_id}", response_model=user_schemas.Profile)
def update_profile(
    user_id: str,
    profile_update: user_schemas.ProfileUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # For now, we allow updating any profile if you have a valid token (Demo Mode)
    # In production, check if token.sub (email) corresponds to user_id or is Admin
    
    # Verify token validity
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("sub") is None:
             raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    
    # Extract extended fields to put into metadata_json
    update_data = profile_update.model_dump(exclude_unset=True)
    
    # Fields that exist on the Profile model
    model_fields = ["name", "bio", "location", "is_verified", "metadata_json"]
    
    # Init metadata if None
    if db_profile and db_profile.metadata_json is None:
        db_profile.metadata_json = {}
    elif not db_profile:
        # Will be created, so init dict
        # Note: metadata_json handled below
        pass

    extended_data = {}
    for key, value in update_data.items():
        if key not in model_fields and key != "metadata_json":
             extended_data[key] = value

    if not db_profile:
        # Check if user exists first
        user = db.query(user_models.User).filter(user_models.User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Create new profile
        # First filter out non-model fields
        create_data = {k: v for k, v in update_data.items() if k in model_fields}
        
        # Merge extended data into metadata_json
        if "metadata_json" not in create_data or create_data["metadata_json"] is None:
            create_data["metadata_json"] = {}
        
        create_data["metadata_json"].update(extended_data)
        
        db_profile = user_models.Profile(user_id=user_id, **create_data)
        db.add(db_profile)
    else:
        # Update existing
        current_metadata = dict(db_profile.metadata_json) if db_profile.metadata_json else {}
        current_metadata.update(extended_data)
        
        # Explicitly update metadata_json
        if "metadata_json" in update_data and update_data["metadata_json"]:
             current_metadata.update(update_data["metadata_json"])
        
        setattr(db_profile, "metadata_json", current_metadata)

        for key, value in update_data.items():
            if key in model_fields and key != "metadata_json":
                setattr(db_profile, key, value)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile

from fastapi import UploadFile, File
import shutil
import os

@router.post("/{user_id}/avatar")
def upload_avatar(
    user_id: str,
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # Verify token (omitted for brevity, same as update_profile logic)
    
    # Save file
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
        
    file_extension = file.filename.split(".")[-1]
    filename = f"{user_id}_avatar.{file_extension}"
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Update profile with avatar URL
    # Assuming URL is /uploads/{filename}
    avatar_url = f"/uploads/{filename}"
    
    db_profile = db.query(user_models.Profile).filter(user_models.Profile.user_id == user_id).first()
    if db_profile:
        meta = dict(db_profile.metadata_json) if db_profile.metadata_json else {}
        meta["avatar"] = avatar_url
        db_profile.metadata_json = meta
        db.commit()
        db.refresh(db_profile)
    
    return {"avatar_url": avatar_url}
