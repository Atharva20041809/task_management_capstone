# Simple Task Management System

A full-stack web application for managing personal tasks with a Kanban-style board. Built with React, Node.js, Express, MongoDB, and Prisma. Implements JWT authentication, the Factory design pattern, and SOLID principles throughout.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Axios, React Context API |
| Backend | Node.js, Express |
| Database | MongoDB Atlas + Prisma ORM |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Security | Helmet.js, CORS |

---

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based stateless authentication
- Full CRUD for tasks (Create, Read, Update, Delete)
- Three-stage task workflow: `TODO` → `IN_PROGRESS` → `COMPLETED`
- Task priority levels: `LOW`, `MEDIUM`, `HIGH`
- Optional due date per task
- Task ownership enforcement — users only see their own tasks
- Centralized error handling
- Factory design pattern for consistent task creation

---

## Project Structure

```
Task_management__Capstone/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Prisma data models (User, Task)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── AuthController.js  # Register & login HTTP handlers
│   │   │   └── TaskController.js  # CRUD task HTTP handlers
│   │   ├── factory/
│   │   │   └── TaskFactory.js     # Factory pattern for task creation
│   │   ├── lib/
│   │   │   └── prisma.js          # Prisma client singleton
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js # JWT verification
│   │   │   └── error.middleware.js# Global error handler
│   │   ├── routes/
│   │   │   ├── auth.routes.js     # /api/auth/*
│   │   │   └── task.routes.js     # /api/tasks/*
│   │   ├── services/
│   │   │   ├── UserService.js     # Auth business logic
│   │   │   └── TaskService.js     # Task business logic
│   │   └── server.js              # Express app entry point
│   ├── .env.example               # Environment variable template
│   └── package.json
├── frontend/
├── diagram_1_use_case.png
├── diagram_2_sequence.png
├── diagram_3_er.png
└── diagram_4_class.png
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://cloud.mongodb.com) account

### 1. Clone the repository

```bash
git clone https://github.com/AnanyaSoni2004/Task_management__Capstone.git
cd Task_management__Capstone
```

### 2. Set up the backend

```bash
cd backend
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5001
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority"
JWT_SECRET="your_strong_random_secret"
JWT_EXPIRES_IN="24h"
CLIENT_ORIGIN="http://localhost:5173"
```

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Generate Prisma client and push schema

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the backend

```bash
npm start         # production
npm run dev       # development (nodemon)
```

Server runs at `http://localhost:5001`

---

## API Reference

Base URL: `http://localhost:5001/api`

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive JWT token |

#### POST /auth/register
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

#### POST /auth/login
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "John Doe" }
}
```

### Task Endpoints (all require JWT)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/tasks` | Get all tasks for the logged-in user |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/:id` | Get a single task by ID |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

#### POST /tasks — Request Body
```json
{
  "title": "Prepare project report",
  "description": "Write and submit the final SDD.",
  "priority": "HIGH",
  "dueDate": "2026-04-15T00:00:00.000Z"
}
```

#### PUT /tasks/:id — Updatable fields
```json
{
  "title": "Updated title",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "dueDate": null
}
```

Valid `status` values: `TODO`, `IN_PROGRESS`, `COMPLETED`  
Valid `priority` values: `LOW`, `MEDIUM`, `HIGH`

---

## Task Status Workflow

```
TODO  ──►  IN_PROGRESS  ──►  COMPLETED
  ▲              │                │
  └──────────────┘                │
  └────────────────────────────── ┘  (reopen)
```

---

## UML Diagrams

| Diagram | File |
|---------|------|
| Use Case | `diagram_1_use_case.png` |
| Sequence (Create Task) | `diagram_2_sequence.png` |
| Entity-Relationship | `diagram_3_er.png` |
| Class | `diagram_4_class.png` |

---

## Design Patterns & Principles

- **Factory Pattern** — `TaskFactory.js` centralizes and validates all task object creation
- **Single Responsibility** — each file has one job (controller = HTTP, service = logic, factory = creation)
- **Open/Closed** — `TaskFactory` is extendable without modifying core logic
- **Dependency Inversion** — controllers depend on service abstractions, not Prisma directly
- **JWT Auth** — stateless, token-based authentication with 24h expiry

---

## Security

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens expire after 24 hours
- Task ownership enforced on every request server-side
- Secrets stored in `.env`, never in source code
- Helmet.js sets secure HTTP headers
- CORS restricted to frontend origin

---

## License

Academic use only.
