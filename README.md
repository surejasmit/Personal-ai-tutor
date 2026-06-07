# Personalized AI Tutor

A full-stack learning platform that gives students topic-wise quizzes, tracks their progress, and uses a Random Forest ML model to recommend what to study next. Has an AI chatbot powered by Gemini for doubt-solving.

Built this as a project to explore how ML-based recommendations can work in an ed-tech context.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)
![Python](https://img.shields.io/badge/Python-scikit--learn-orange?logo=python)

---

## What it does

- **Sign up / Login** with JWT auth. Security questions for password recovery (no email service needed).
- **Topic quizzes** — 8 CS topics pre-loaded (Data Structures, Algorithms, OOP, DBMS, OS, CN, Web Dev, AI/ML) with MCQ question banks.
- **Dashboard** — see your recent scores, quiz history, and the ML model's recommendation for what to study next.
- **Progress tracking** — detailed stats per topic, score trends over time.
- **AI Chatbot** — Gemini 2.0 Flash powered chatbot that streams responses. Can explain concepts, generate roadmaps, help debug code, etc.
- **ML Recommendations** — a RandomForest classifier trained on your quiz history that predicts the best next topic based on your scores, time taken, and performance patterns.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router v7, Lucide icons |
| Backend | Node.js, Express 5, JWT, bcrypt |
| Database | PostgreSQL |
| ML Model | Python, scikit-learn (RandomForestClassifier), pandas, joblib |
| AI Chat | Google Gemini 2.0 Flash (streaming SSE) |

## Project Structure

```
├── Frontend/          # React + Vite app
│   └── src/
│       ├── pages/     # Landing, SignUp, Login, ForgotPassword, Dashboard,
│       │              # Quizpage, Profile, MyProgress, AITutor, Chatbot, NotFound
│       └── components/
├── Backend/           # Express API server
│   ├── routes/        # auth, dashboard, quiz, profile, recommendation,
│   │                  # MyProgress, chatbot
│   ├── middleware/     # JWT auth middleware
│   └── config/        # DB pool setup
├── Database/
│   ├── schema/        # SQL table definitions (users, topics, questions,
│   │                  # quiz_results, progress, recommendations)
│   └── seed/          # Question banks per topic (~100+ questions each)
├── ML-Model/
│   ├── train-model.py           # Trains the RandomForest model
│   ├── predict-recommedaion.py  # CLI script called by Node backend
│   ├── model.pkl                # Trained model (generated)
│   └── label_encoder.pkl        # Label encoder (generated)
```

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Python 3.9+ (for the ML model)

### 1. Database

Create a PostgreSQL database called `ai-tutor` and run the schema files:

```bash
createdb ai-tutor

# Run schema files in order
psql -d ai-tutor -f Database/schema/users.sql
psql -d ai-tutor -f Database/schema/topics.sql
psql -d ai-tutor -f Database/schema/questions.sql
psql -d ai-tutor -f Database/schema/quiz_results.sql
psql -d ai-tutor -f Database/schema/progress.sql
psql -d ai-tutor -f Database/schema/recommendations.sql

# Seed the question banks
psql -d ai-tutor -f Database/seed/ds_questions.sql
psql -d ai-tutor -f Database/seed/algo_questions.sql
psql -d ai-tutor -f Database/seed/oop_questions.sql
psql -d ai-tutor -f Database/seed/dbms_questions.sql
psql -d ai-tutor -f Database/seed/os_questions.sql
psql -d ai-tutor -f Database/seed/cn_questions.sql
psql -d ai-tutor -f Database/seed/webdev_questions.sql
psql -d ai-tutor -f Database/seed/AIML_questions.sql
```

Or restore the full backup:

```bash
psql -d ai-tutor -f Database/ai-tutor-backup.sql
```

### 2. Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ai-tutor
JWT_SECRET=your-random-secret-key
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
```

Start the server:

```bash
npm run dev
```

Runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd Frontend
npm install
```

The `.env` file should have:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Opens on `http://localhost:5173`.

### 4. ML Model (optional — needed for recommendations)

```bash
cd ML-Model
pip install -r requirements.txt
```

Create a `.env` with your DB credentials:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ai-tutor
DB_PASSWORD=yourpassword
DB_PORT=5432
```

Train the model (needs at least some quiz data — it'll generate sample data if the DB is empty):

```bash
python train-model.py
```

This creates `model.pkl` and `label_encoder.pkl`. The Node.js backend calls `predict-recommedaion.py` as a child process when generating recommendations.

## How the ML Recommendation Works

Pretty straightforward approach:

1. After each quiz, the backend sends the user's scores to `predict-recommedaion.py`
2. The script loads the trained RandomForest model
3. Features used: `topic_id`, `score`, `total_questions`, `correct_answers`, `wrong_answers`, `time_taken`, `percentage`
4. The model predicts the next recommended topic:
   - Score < 50% → revisit the same topic
   - Score 50-80% → move to the next topic
   - Score > 80% → skip ahead by two topics
5. Recommendation gets saved to the DB and shown on the dashboard

The model improves as users take more quizzes (more training data).

## API Routes

```
POST /api/auth/register              # Sign up (includes security question)
POST /api/auth/login                 # Login → returns JWT
POST /api/auth/forgot-password/question  # Get security question by email
POST /api/auth/forgot-password/verify    # Verify the answer
POST /api/auth/forgot-password/reset     # Reset password

GET  /api/dashboard/:userId          # Dashboard data
GET  /api/quiz/topics                # List all topics
GET  /api/quiz/:topicId/questions    # Get quiz questions
POST /api/quiz/submit                # Submit quiz answers
GET  /api/profile/:userId            # User profile
PUT  /api/profile/:userId            # Update profile
GET  /api/myprogress/:userId         # Detailed progress stats
POST /api/recommendation/:userId     # Trigger ML recommendation
POST /api/chatbot/message            # AI chat (SSE streaming)
```

## Quiz Topics

| # | Topic | Questions |
|---|---|---|
| 1 | Data Structures | ~50+ |
| 2 | Algorithms | ~50+ |
| 3 | Object Oriented Programming | ~50+ |
| 4 | DBMS | ~50+ |
| 5 | Operating Systems | ~50+ |
| 6 | Computer Networks | ~50+ |
| 7 | Web Development | ~50+ |
| 8 | AI & Machine Learning | ~50+ |

## Screenshots

_TODO: Add screenshots of the dashboard, quiz page, chatbot, and progress page._

## Known Issues / Future Plans

- The ML model needs a decent amount of quiz data before recommendations get accurate. With just a few quizzes it tends to overfit.
- No email-based password reset — using security questions instead (works offline, simpler setup).
- Mobile responsiveness is mostly there but some pages could use tweaking on very small screens.

## License

MIT
