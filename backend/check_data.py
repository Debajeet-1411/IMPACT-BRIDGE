from app.db.database import SessionLocal
from app.models.user import User, Profile
from app.models.social import Post

db = SessionLocal()
user_count = db.query(User).count()
profile_count = db.query(Profile).count()
post_count = db.query(Post).count()

print(f"Users: {user_count}")
print(f"Profiles: {profile_count}")
print(f"Posts: {post_count}")

posts = db.query(Post).limit(5).all()
for p in posts:
    print(f"Post ID: {p.id}, Content: {p.content[:30]}..., Author: {p.author.profile.name if p.author and p.author.profile else 'None'}")
