# Simple Task Management System

A beginner-friendly full-stack task management application built for academic demonstration.

## Features
- User Authentication (Signup/Login/Logout) via JWT
- Task CRUD (Create, Read, Update, Delete)
- Task Status Management (Todo, In Progress, Completed)
- Factory Design Pattern for task creation
- SOLID principles followed for clean architecture

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB with Prisma ORM
- **Styling:** Vanilla CSS

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB URI (Atlas or local)

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in the `backend` directory (if not already present).
   - Add your MongoDB connection string and JWT secret:
     ```env
     DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskDB"
     JWT_SECRET="your_secret_key"
     PORT=5000
     ```
4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Design Patterns & Principles
- **Encapsulation:** Data models and status logic are encapsulated within the Prisma schema and controller logic.
- **Abstraction:** Reusable API services abstract the complexity of HTTP requests.
- **Factory Pattern:** Located in `backend/controllers/taskController.js`, used to create task objects uniformly.
- **SOLID (Single Responsibility):** Controllers handle logic, routes handle mapping, and services handle data fetching.
