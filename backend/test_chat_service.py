import asyncio
import os
from app.services.ai_service import AIService
from dotenv import load_dotenv

load_dotenv()

async def test_chat():
    print("Testing AI Chat...")
    response = await AIService.chat("Hello, how can you help me?")
    print(f"Response: {response}")

if __name__ == "__main__":
    asyncio.run(test_chat())
