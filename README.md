# Impact Bridge - AI-Powered NGO-CSR Donation Platform

## 🚀 Overview

**Impact Bridge** is a production-ready web platform that intelligently connects corporate donors with NGOs through AI-powered matching, reducing waste and maximizing social impact. The platform uses Google's Gemini AI to analyze donations, match them with appropriate NGOs, generate explainable recommendations, and produce professional CSR impact reports.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                          │
│  Next.js 14 + React + TypeScript + Tailwind CSS             │
│  - Landing Page with Google OAuth                           │
│  - Donor Dashboard (Create donations, view matches)         │
│  - NGO Dashboard (Profile setup, accept/reject donations)   │
│  - Admin/Metrics Dashboard                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API LAYER                       │
│  Node.js + Express + TypeScript                             │
│  - Authentication (Google OAuth + JWT)                      │
│  - Donor Routes (/api/donation/*)                          │
│  - NGO Routes (/api/ngo/*)                                 │
│  - Metrics Routes (/api/metrics)                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      AI SERVICE LAYER                        │
│  Google Gemini API Integration                              │
│  - Donation text extraction (unstructured → structured)     │
│  - NGO profile understanding                                │
│  - Semantic matching (0-1 relevance score)                 │
│  - Match explanation generation                             │
│  - CSR impact report generation                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  SQLite + Prisma ORM                                        │
│  - User (email, role, auth)                                │
│  - Donor (organization, location)                          │
│  - NGO (capacity, urgency, needs)                          │
│  - Donation (raw text, structured data, status)            │
│  - Match (score, explanation, CSR report)                  │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Key Features

### For Donors (Corporates/Hotels/Factories)
- **Simple Donation Creation**: Describe donations in natural language
- **AI-Powered Extraction**: Automatically extracts type, quantity, expiry from text
- **Smart NGO Matching**: AI finds the best NGO based on distance, urgency, capacity, and semantic relevance
- **Explainable Recommendations**: See why each NGO was selected
- **CSR Impact Reports**: Generate professional reports for compliance
- **Real-Time Status**: Track donation acceptance status

### For NGOs
- **Profile Management**: Set up capacity, urgency, and accepted donation types
- **AI-Assisted Profiling**: System understands your needs from description
- **Incoming Matches**: View donations matched to your organization
- **Transparent Reasoning**: Understand why each donation was matched
- **Accept/Reject Control**: Full control over which donations to accept
- **Match History**: Track past donations and impact

### For Platform Administrators
- **Analytics Dashboard**: Total donations, NGOs, successful matches
- **Impact Metrics**: Meals served, waste reduced, distance saved
- **Real-Time Insights**: Monitor platform activity

## 🧠 AI Integration Points

The platform uses **Google Gemini AI** for 5 critical functions:

### 1. Donation Text Extraction
**Input**: *"50 kg rice, 30 kg lentils, expires in 6 hours"*  
**Output**:
```json
{
  "type": "food",
  "quantity": 80,
  "expiryHours": 6,
  "items": ["rice", "lentils"]
}
```

### 2. NGO Profile Understanding
**Input**: *"Orphanage serving 100 children daily, need food and education supplies"*  
**Output**:
```json
{
  "primaryNeeds": ["food", "education supplies"],
  "servingCapacity": 100,
  "targetBeneficiaries": "children"
}
```

### 3. Semantic Matching
**Input**: Donation text + NGO description  
**Output**:
```json
{
  "score": 0.85,
  "reasoning": "Donation aligns well with NGO's food needs and capacity"
}
```

### 4. Match Explanation Generation
**Input**: Donation + NGO + Match data  
**Output**: *"This NGO was selected because they serve 100 children daily and are located only 3.2 km away. The food donation matches their immediate needs and capacity."*

### 5. CSR Impact Report
**Input**: Complete match data  
**Output**: Professional markdown report with Executive Summary, Impact Metrics, Environmental Benefits

## 🎯 Matching Algorithm

The platform uses a **hybrid deterministic + AI-assisted** approach:

### Hard Filters (No AI)
1. **Distance**: NGO must be within 50 km
2. **Type Compatibility**: Donation type must match NGO's accepted types
3. **Capacity**: NGO capacity ≥ 20% of donation quantity
4. **Expiry Window**: NGO can receive within expiry time

### Scoring (0-1 scale)
```
Final Score = 0.3 × Distance Score
            + 0.3 × Urgency Score
            + 0.2 × Capacity Fit
            + 0.2 × AI Semantic Score
```

- **Distance Score**: `1 - (distance / 50)` — closer is better
- **Urgency Score**: `urgencyLevel / 5` — higher urgency prioritized
- **Capacity Fit**: `min(quantity / capacity, 1)` — optimal sizing
- **AI Semantic Score**: Gemini API analyzes textual relevance

**Selection**: Highest scoring NGO is selected, then AI generates explanation.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: @react-oauth/google
- **State**: React Context API
- **Notifications**: react-hot-toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Auth**: Google OAuth 2.0 + JWT
- **AI**: @google/generative-ai (Gemini)

### Database
- **Database**: SQLite (easy setup, production-ready for PostgreSQL/MySQL)
- **ORM**: Prisma
- **Migrations**: Prisma Migrate

### Development Tools
- **Build**: tsx (TypeScript execution)
- **Linting**: ESLint
- **Package Manager**: npm

## 📦 Project Structure

```
ngo-csr-platform/
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   └── ai.service.ts          # Gemini AI integration
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts     # JWT authentication
│   │   ├── routes/
│   │   │   ├── auth.routes.ts         # Google OAuth + role selection
│   │   │   ├── donor.routes.ts        # Donation endpoints
│   │   │   ├── ngo.routes.ts          # NGO profile + match responses
│   │   │   └── metrics.routes.ts      # Analytics endpoints
│   │   ├── services/
│   │   │   └── matching.service.ts    # Core matching algorithm
│   │   ├── utils/
│   │   │   └── distance.ts            # Haversine distance calculation
│   │   └── index.ts                   # Express server entry
│   ├── prisma/
│   │   └── schema.prisma              # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                           # API keys and config
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   │   └── select-role/       # Role selection page
│   │   │   ├── donor/
│   │   │   │   └── dashboard/          # Donor dashboard
│   │   │   ├── ngo/
│   │   │   │   └── dashboard/          # NGO dashboard
│   │   │   ├── admin/                  # Metrics dashboard
│   │   │   ├── layout.tsx              # Root layout
│   │   │   ├── page.tsx                # Landing page
│   │   │   └── globals.css             # Global styles
│   │   ├── components/
│   │   │   └── Navbar.tsx              # Navigation bar
│   │   ├── lib/
│   │   │   ├── api.ts                  # API client
│   │   │   └── auth-context.tsx        # Auth state management
│   │   └── types/
│   │       └── index.ts                # TypeScript definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.local                      # Frontend config
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Google Cloud Account** (for OAuth)
- **Google AI Studio** (for Gemini API key)

### 1. Clone the Repository
```bash
cd "d:\BUILDATHON PRJ"
# Files are already in place
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
# .env file is already created with your credentials:
# GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
# GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
# GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio

# Start development server
npm run dev
```

Backend will run on: **http://localhost:5000**

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Environment variables already set in .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 4. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client (ID: `644187262313-at7j2hrlh54can27f3rp4kena8veq2a9`)
4. **Add Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `http://localhost:5000`
5. **Add Authorized redirect URIs**:
   - `http://localhost:3000`
   - `http://localhost:5000/api/auth/google`

## 📖 Usage Guide

### Donor Workflow

1. **Navigate** to `http://localhost:3000`
2. **Click** "Sign in with Google"
3. **Select** "I'm a Donor"
4. **Create Donation**:
   - Describe donation in plain text
   - Example: *"100 kg surplus rice from hotel kitchen, 50 boxes of unused toiletries. Expires in 12 hours."*
   - Click "Create Donation & Find Match"
5. **View Match**:
   - See matched NGO details
   - Read AI explanation for why NGO was selected
6. **Wait for Acceptance**
7. **Generate CSR Report** (after NGO accepts)

### NGO Workflow

1. **Navigate** to `http://localhost:3000`
2. **Click** "Sign in with Google"
3. **Select** "I'm an NGO"
4. **Set Up Profile**:
   - Organization name
   - Description (AI will analyze this)
   - Capacity (people served daily)
   - Urgency level (1-5)
   - Accepted donation types
5. **View Incoming Matches**
6. **Review** match details and AI reasoning
7. **Accept or Reject** donations

### Admin Workflow

1. **Sign in** as any user
2. **Navigate** to `/admin`
3. **View** platform metrics:
   - Total donations
   - Active NGOs
   - Successful matches
   - Meals served
   - Waste reduced
   - Average distance

## 🧪 Testing

### Manual Testing Checklist

**Authentication**:
- [ ] Google OAuth login works
- [ ] Role selection persists
- [ ] Protected routes redirect correctly
- [ ] Logout clears session

**Donor Flow**:
- [ ] Create donation with text description
- [ ] AI extracts structured data correctly
- [ ] NGO match appears
- [ ] "Why this NGO?" explanation is relevant
- [ ] CSR report generates after acceptance

**NGO Flow**:
- [ ] Profile creation works
- [ ] AI analyzes description
- [ ] Incoming matches appear
- [ ] Accept/Reject updates status
- [ ] Filter by status works

**Matching Algorithm**:
- [ ] Distance filter works (50km max)
- [ ] Type compatibility enforced
- [ ] Capacity check works
- [ ] Scoring produces reasonable results
- [ ] Explanation is coherent

**AI Integration**:
- [ ] Donation extraction handles edge cases
- [ ] Semantic matching scores make sense
- [ ] Explanations are professional
- [ ] CSR reports are well-formatted

### Sample Test Data

**Donor Test Donation**:
```
50 kg of rice, 30 kg of lentils, 20 liters of cooking oil. 
From hotel surplus kitchen. Expires in 6 hours.
```

**NGO Test Profile**:
```
Hope Children's Home serves 100 orphaned children daily. 
We provide meals, education, and shelter. Urgently need food 
donations especially rice, vegetables, and cooking supplies.
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
FRONTEND_URL="http://localhost:3000"
PORT=5000
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
```

## 🚢 Production Deployment

### Backend Deployment

1. **Update DATABASE_URL** to PostgreSQL/MySQL connection string
2. **Set JWT_SECRET** to a strong random value
3. **Run migrations**: `npx prisma migrate deploy`
4. **Build**: `npm run build`
5. **Start**: `npm start`

### Frontend Deployment

1. **Update NEXT_PUBLIC_API_URL** to production backend URL
2. **Build**: `npm run build`
3. **Start**: `npm start`

### Recommended Platforms
- **Backend**: Railway, Render, DigitalOcean
- **Frontend**: Vercel, Netlify
- **Database**: PostgreSQL on Supabase, Railway, or Neon

## 📊 API Documentation

### Authentication Endpoints

**POST** `/api/auth/google`
- Body: `{ idToken: string }`
- Response: `{ token: string, user: User }`

**POST** `/api/auth/select-role`
- Headers: `Authorization: Bearer <token>`
- Body: `{ role: "DONOR" | "NGO" }`
- Response: `{ token: string, user: User }`

**GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`
- Response: `{ user: User, profile: Donor | NGO }`

### Donor Endpoints

**POST** `/api/donation/create`
- Headers: `Authorization: Bearer <token>`
- Body: `{ rawText: string, latitude: number, longitude: number }`
- Response: `{ donation: Donation, match: Match | null }`

**GET** `/api/donation/current`
- Headers: `Authorization: Bearer <token>`
- Response: `{ donation: Donation, match: Match, ngo: NGO }`

**GET** `/api/donation/report/:donationId`
- Headers: `Authorization: Bearer <token>`
- Response: `{ csrReport: string, match: Match }`

### NGO Endpoints

**POST** `/api/ngo/profile`
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, description, latitude, longitude, capacity, urgencyLevel, acceptedDonationTypes }`
- Response: `{ ngo: NGO, insights: AIInsights }`

**GET** `/api/ngo/matches`
- Headers: `Authorization: Bearer <token>`
- Query: `?status=PENDING|ACCEPTED`
- Response: `{ matches: Match[] }`

**POST** `/api/ngo/respond`
- Headers: `Authorization: Bearer <token>`
- Body: `{ matchId: string, action: "ACCEPT" | "REJECT" }`
- Response: `{ match: Match }`

### Metrics Endpoint

**GET** `/api/metrics`
- Headers: `Authorization: Bearer <token>`
- Response: `{ totalDonations, totalNGOs, successfulMatches, estimatedMealsServed, wasteReduced, totalDistanceSaved, averageMatchDistance }`

## 🎨 Design Philosophy

- **Professional, Not Charitable**: Corporate-friendly, infrastructure-style design
- **Trustworthy**: Neutral color palette (blues, grays)
- **Transparent**: All AI decisions are explained
- **Accessible**: Clear typography, good contrast
- **Responsive**: Works on desktop, tablet, mobile

## 🤖 AI Prompt Engineering

All AI prompts are designed to:
1. **Return strict JSON** for parsing reliability
2. **Handle edge cases** with fallback values
3. **Provide reasoning** for explainability
4. **Use professional language** for CSR reports
5. **Never override** hard business rules

## 🔐 Security

- **JWT Authentication**: Secure token-based auth
- **Google OAuth**: Industry-standard authentication
- **Role-Based Access Control**: Route-level protection
- **Input Validation**: All user inputs validated
- **Environment Variables**: Secrets never in code
- **CORS Protection**: Origin restrictions
- **SQL Injection Prevention**: Prisma ORM parameterization

## 🐛 Troubleshooting

### "Google OAuth Error"
- Check authorized JavaScript origins in Google Cloud Console
- Verify GOOGLE_CLIENT_ID matches in both frontend and backend
- Ensure redirect URIs are correctly configured

### "AI Request Failed"
- Verify GEMINI_API_KEY is correct
- Check API quota in Google AI Studio
- Review network connectivity

### "Database Migration Failed"
- Delete `prisma/dev.db` and `prisma/migrations/` folder
- Run `npx prisma migrate dev --name init` again

### "CORS Error"
- Ensure FRONTEND_URL in backend .env matches frontend URL
- Check backend is running on port 5000

## 📝 License

This project is created for educational and demonstration purposes.

## 👥 Contributing

This is a demonstration project. For production use:
1. Add comprehensive testing (Jest, Cypress)
2. Implement rate limiting
3. Add error logging (Sentry)
4. Set up CI/CD
5. Add monitoring (New Relic)
6. Implement email notifications

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent reasoning
- **Next.js** for amazing developer experience
- **Prisma** for type-safe database access
- **Tailwind CSS** for rapid UI development

---

**Built with ❤️ for social impact**

For questions or support, please refer to the documentation above.
