from app.db.database import engine, Base, SessionLocal
from app.models.user import User, Profile, Role
from app.models.social import Post, PostType
import traceback

def run_seed():
    try:
        print("Starting simple seed...")
        print("Dropping all tables...")
        Base.metadata.drop_all(bind=engine)
        print("Creating all tables...")
        Base.metadata.create_all(bind=engine)
        
        print(f"SessionLocal type: {SessionLocal}")
        db = SessionLocal()
        print("Session created.")

        ngo_data = {
            "name": "Child Rights and You (CRY)",
            "bio": "Ensuring happy, healthy and creative childhoods.",
            "location": "Mumbai, MH",
            "metadata": {
                "type": "Child Welfare", "verified": True, "reg_no": "E-1234 (BOM)", "beneficiaries": "1.2M children",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/CRY_logo.svg/1200px-CRY_logo.svg.png",
                "cover_image": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
            },
            "posts": [
                {
                    "content": "Urgent: 500 Winter Jackets needed 🧥 for children in our northern centers. Temperatures are dropping fast! ❄️",
                    "meta": {"items": ["Jackets"], "quantity": "500 Units", "deadline": "2 Days", "requirements": "New/Good Condition", "logistics": "Pickup Needed", "category": "Clothes", "urgency": "Critical"}
                }
            ]
        }
        
        print("Adding User...")
        user = User(email="cry@ngo.org", role=Role.NGO)
        db.add(user)
        db.flush()
        
        print("Adding Profile...")
        profile = Profile(
            user_id=user.id, 
            name=ngo_data['name'], 
            bio=ngo_data['bio'], 
            location=ngo_data['location'], 
            is_verified=True,
            metadata_json=ngo_data['metadata']
        )
        db.add(profile)
        
        print("Adding Posts...")
        for post_data in ngo_data['posts']:
            post = Post(
                user_id=user.id,
                content=post_data['content'],
                type=PostType.NEED,
                ai_metadata=post_data['meta']
            )
            db.add(post)
        
        db.commit()
        db.close()
        print("Simple seed successful!")

    except Exception:
        print(traceback.format_exc())

if __name__ == "__main__":
    run_seed()
