from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas import social as social_schemas
from app.models import social as social_models
from app.models import user as user_models
from app.api.auth import oauth2_scheme
from app.services.ai_service import AIService
from typing import List

router = APIRouter()

@router.post("/", response_model=social_schemas.Post)
async def create_post(
    post: social_schemas.PostCreate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # In practice, decode token to get user_id
    # For now, we'll pick the first user or create a guest
    current_user = db.query(user_models.User).first()
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")

    # AI Extraction
    ai_metadata = await AIService.extract_intent(post.content)

    db_post = social_models.Post(
        **post.model_dump(),
        user_id=current_user.id,
        ai_metadata=ai_metadata
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/", response_model=List[social_schemas.Post])
def get_posts(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    posts = db.query(social_models.Post).order_by(social_models.Post.created_at.desc()).offset(skip).limit(limit).all()
    
    results = []
    for p in posts:
        author_data = None
        if p.author and p.author.profile:
            author_data = {
                "id": p.author.id,
                "name": p.author.profile.name,
                "is_verified": p.author.profile.is_verified,
                "avatar": p.author.profile.metadata_json.get("avatar") if p.author.profile.metadata_json else None
            }
        
        # We must construct the Pydantic model manually or let it validate from dict
        # because we are adding a computed field 'author' that isn't a direct column
        p_dict = {
            "id": p.id,
            "content": p.content,
            "type": p.type,
            "media_url": p.media_url,
            "user_id": p.user_id,
            "ai_metadata": p.ai_metadata,
            "created_at": p.created_at,
            "author": author_data
        }
        results.append(p_dict)
    return results
