from app.db.database import engine, Base, SessionLocal
from app.models.user import User, Profile, Role
from app.models.social import Post, PostType
from sqlalchemy import text
import traceback

try:
    print(f"Engine: {engine}")
    
    print("Creating SessionLocal...")
    db = SessionLocal()
    print("SessionLocal created!")
    
    db.close()
    print("Session closed.")

    with engine.connect() as conn:
        print("Connection successful!")
        result = conn.execute(text("SELECT 1"))
        print(f"Select 1 result: {result.fetchone()}")

    print("Attempting drop_all...")
    Base.metadata.drop_all(bind=engine)
    print("drop_all successful!")

    print("Attempting create_all...")
    Base.metadata.create_all(bind=engine)
    print("create_all successful!")

except Exception:
    print(traceback.format_exc())
