# Google Antigravity – Social Network for Social Good

## Getting Started

### 1. Backend Setup
1. Open a terminal in the `backend` directory.
2. Initialize and activate the virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Run the seed script to populate sample data:
   ```powershell
   python seed.py
   ```
5. Start the FastAPI server:
   ```powershell
   uvicorn app.main:app --reload
   ```

### 2. Frontend Setup
1. Open a terminal in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Visual Social Feed: `http://localhost:3000/feed`
- AI Matching: `http://localhost:3000/matches`
- Role Selection: `http://localhost:3000/auth/login`

## Architecture Highlights
- **AI Intent Extraction**: Automatically parses unstructured posts into actionable needs/availabilities.
- **Semantic Matching**: LLM-powered scoring (0 to 1) for NGO-Corporate relevance with reasoning explanations.
- **Premium UI**: Clean, corporate-grade interface with glassmorphism and real-time feedback.
- **Transparent CSR**: Impact metrics and automated reporting foundation.
