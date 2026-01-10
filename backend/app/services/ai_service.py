import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini Client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class AIService:
    @staticmethod
    async def extract_intent(content: str):
        # AI prompt for extracting structured data
        prompt = f"""
        Given the following post content from a platform for NGOs and Companies:
        "{content}"
        
        Extract:
        1. items: List of items needed or offered
        2. quantity: Estimated quantity if mentioned
        3. urgency: High, Medium, Low
        4. category: Food, Medical, Education, Financial, Supplies
        
        Return valid JSON only.
        """
        try:
            response = client.models.generate_content(
                model="models/gemini-2.5-flash",
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                }
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"AI Extraction error: {e}")
            return {"items": [], "quantity": "", "urgency": "Medium", "category": "General"}

    @staticmethod
    async def calculate_match(need_data: dict, availability_data: dict):
        # AI prompt for semantic matching
        prompt = f"""
        NGO Need: {json.dumps(need_data)}
        Company Availability: {json.dumps(availability_data)}
        
        Score the relevance between these two (0 to 1).
        Provide a short explanation (1 sentence).
        Return valid JSON only: {{"score": 0.XX, "explanation": "..."}}
        """
        try:
            response = client.models.generate_content(
                model="models/gemini-2.5-flash",
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                }
            )
            return json.loads(response.text)
        except Exception:
            return {"score": 0.0, "explanation": "Unable to calculate match score."}

    @staticmethod
    async def chat(message: str):
        try:
            # Fallback if no API key
            if not os.getenv("GEMINI_API_KEY"):
                 return "I am a simulated AI. Please configure the Gemini API key to get real responses."

            response = client.models.generate_content(
                model="models/gemini-2.5-flash",
                contents=[
                    # Note: Gemini system instructions are usually separate, but for simplicity we can prepend or use the proper parameter if needed.
                    # For compatibility with this simple call structure, we'll just send the user message directly or context + message.
                    # Ideally, client.chats.create for history, but here we just do single turn for now as per previous design.
                    # We can prepend a system prompt string.
                    "You are a helpful assistant for an NGO/Company matching platform. You help users find information about donations, volunteering, and impact reports.\n\nUser: " + message
                ]
            )
            return response.text
        except Exception as e:
            with open("backend_error.log", "w") as f:
                import traceback
                traceback.print_exc(file=f)
                f.write(f"\nError: {e}")
            return "I'm having trouble connecting to my brain right now."
