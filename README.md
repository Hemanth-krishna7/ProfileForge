# ProfileForge

A modern, full-stack developer profile card generator where users can fill in details to create and preview professional profile cards in real-time.

---

## Features
- **Live Preview**: Card updates instantly in the preview panel as the user types.
- **Theme Selection**: Seamlessly toggle between Light and Dark themes.
- **Backend Validation**: Processes comma-separated skills, sanitizes URLs, and validates inputs.
- **Polished UX**: Embedded loading spinner, styled validation error banners, and success feedback.

---

## Prerequisites
Ensure you have **Node.js** (version 18 or above) installed on your system.

---

## How to Run

Follow these steps to launch the application:

### 1. Run the Backend Server
1. Open a new terminal window or command prompt.
2. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
3. (Optional) Install dependencies (if not already completed):
   ```bash
   npm install
   ```
4. Start the Express server:
   ```bash
   npm start
   ```
   *The backend API will run on `http://localhost:5000`.*

### 2. Run the Frontend Client
1. Open a separate terminal window or command prompt.
2. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
3. (Optional) Install dependencies (if not already completed):
   ```bash
   npm install
   ```
4. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The frontend client will open on `http://localhost:5173`.*

---

## Technical Stack
- **Frontend**: React, Tailwind CSS v4, Vite, HTML5 (with SEO title/meta-description)
- **Backend**: Node.js, Express.js, CORS, Dotenv
