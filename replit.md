# DigitalVaidya - AI Symptom Sketcher

## Overview
DigitalVaidya is an AI-powered symptom analysis web application with secure multi-modal authentication. The application features a React frontend with Vite and a Flask backend API.

**Current State**: ✅ Successfully configured and running in Replit environment
- Frontend running on port 5000 (webview)
- Backend configured for port 8000 (localhost)
- All dependencies installed

## Recent Changes (October 31, 2025)
### Initial Setup
- Configured Vite to run on 0.0.0.0:5000 for Replit webview
- Updated HMR settings for WSS protocol support
- Changed backend from port 5000 to 8000 (localhost)
- Updated CORS configuration to allow all origins
- Installed Python 3.11 and Flask dependencies
- Fixed node_modules binary permissions
- Created .gitignore for Python and Node.js

### Firebase Authentication Integration
- Created Firebase configuration file (`src/config/firebase.js`)
- Built comprehensive authentication service (`src/services/authService.js`)
- Updated AuthContext to use Firebase Auth with real-time state management
- Integrated Google Sign-In functionality in LoginOptions
- Updated EmailLogin component with proper Firebase email/password authentication
- Added error handling and loading states for all auth operations
- Configured API key via Replit Secrets (GOOGLE_API_KEY)

### Backend Firebase Authentication
- Installed Firebase Admin SDK (firebase-admin==7.1.0)
- Created authentication middleware (`backend/app/firebase_auth.py`)
- Implemented `@verify_token` decorator for protected routes
- Implemented `@optional_auth` decorator for user-aware routes
- Updated analyze, feedback, and contact endpoints to track authenticated users
- Backend now extracts user info from Firebase ID tokens

### Enhanced Health Parameters in Demo
- Added comprehensive health parameter inputs in Demo section
- Body Temperature (°C)
- Blood Pressure (Systolic/Diastolic)
- Heart Rate (bpm)
- Oxygen Saturation (%)
- Backend AI analysis now processes health parameters
- Smart condition detection based on vital signs
- Real-time API integration with authenticated user tracking

## Project Architecture

### Frontend (React + Vite)
- **Location**: `/src`
- **Entry Point**: `src/main.jsx`
- **Port**: 5000 (bound to 0.0.0.0)
- **Build Tool**: Vite 5.4.8
- **Key Dependencies**:
  - React 18.3.1
  - React Router DOM 6.26.2
  - Framer Motion 11.2.6
  - Tailwind CSS 3.4.15
  - Firebase 11.x (Authentication)

### Backend (Flask)
- **Location**: `/backend`
- **Entry Point**: `backend/wsgi.py`
- **Port**: 8000 (localhost)
- **Key Dependencies**:
  - Flask 3.0.3
  - Flask-CORS 4.0.1
  - Werkzeug 3.0.4
  - Firebase Admin SDK 7.1.0

### Features
- **Firebase Authentication** (Frontend + Backend):
  - Google Sign-In (OAuth)
  - Email/Password authentication
  - Real-time authentication state management
  - Secure credential storage via Replit Secrets
  - Backend token verification with Firebase Admin SDK
  - User tracking across all API endpoints
- **Health Parameters Analysis**:
  - Body Temperature monitoring
  - Blood Pressure (Systolic/Diastolic) tracking
  - Heart Rate monitoring
  - Oxygen Saturation measurement
  - AI-powered condition detection based on vital signs
  - Personalized analysis for authenticated users
- Multi-modal authentication (Face Recognition, Aadhaar) - UI ready
- AI symptom analysis with voice input
- Multilingual support
- Dark mode toggle
- Contact and feedback forms
- Responsive design with Tailwind CSS

### API Endpoints
- `GET /api/health` - Health check (public)
- `POST /api/auth/login` - Email login (public)
- `POST /api/auth/signup` - User signup (public)
- `POST /api/auth/face-login` - Face recognition login (public)
- `POST /api/uploads/aadhaar` - Aadhaar document upload (public)
- `POST /api/forms/feedback` - Submit feedback (optional auth)
- `POST /api/forms/contact` - Contact form submission (optional auth)
- `POST /api/analyze` - Symptom & health parameter analysis (optional auth)
  - Accepts: description, healthParams (temperature, systolicBP, diastolicBP, heartRate, oxygenLevel)
  - Returns: condition, urgency, user info (if authenticated)

## Running the Application

### Development
The frontend workflow is already configured and runs automatically:
```bash
npm run dev
```

To run the backend manually (if needed):
```bash
cd backend
python wsgi.py
```

### Important Configuration
- **Vite Config**: Configured for Replit with host 0.0.0.0, port 5000, and WSS HMR
- **CORS**: Enabled for all origins to work with Replit's proxy
- **Upload Directory**: `backend/uploads` (created automatically)
- **Firebase Config**: 
  - Project: gen-lang-client-0305521767
  - Auth Domain: gen-lang-client-0305521767.firebaseapp.com
  - API Key: Stored securely in Replit Secrets (GOOGLE_API_KEY)
  - Providers enabled: Email/Password, Google OAuth

### Authentication Service Files
- `src/config/firebase.js` - Firebase initialization and configuration
- `src/services/authService.js` - Auth methods (signUp, signIn, signOut, Google auth, password reset)
- `src/context/AuthContext.jsx` - React context with Firebase auth state management
- `src/login/EmailLogin.jsx` - Email/password authentication UI
- `src/login/LoginOptions.jsx` - Login method selection with Google Sign-In

## User Preferences
None specified yet.
