# Kairos — Task Management System

A full-stack task management web application with a Kanban-style board, workspace organization, and JWT authentication. Built with React, Node.js, Express, and MongoDB.

## Features

- **JWT Authentication** — Register, login, logout with bcrypt password hashing and 7-day tokens
- **Kanban Board** — Drag tasks across To Do, In Progress, and Completed columns
- **Workspaces** — Organize tasks into Kairos, Personal, and Side Projects
- **Full Task CRUD** — Create, read, update, and delete tasks
- **Task Fields** — Title, description, priority (Low/Medium/High), due date, project
- **Protected Routes** — All pages require authentication; redirects to login if unauthenticated
- **Optimistic UI** — Instant updates with automatic rollback on failure
- **Responsive Sidebar** — Collapsible navigation with workspace links
- **Factory Design Pattern** — `TaskManager` singleton handles all task operations
- **SOLID Principles** — Clean separation of concerns across controllers, services, and models

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite 6 with dev proxy
- TanStack Router v1 (file-based routing)
- Tailwind CSS v4 + shadcn/ui (New York style)
- Framer Motion (animations)
- Sonner (toast notifications)

**Backend**
- Node.js + Express 5 + TypeScript
- MongoDB + Mongoose 9
- JWT (`jsonwebtoken`) + `bcryptjs`
- `dotenv` for environment config

## Project Structure

```
task_management_capstone/
├── backend/
│   ├── app.ts                        # Express entry point
│   ├── db/connection.ts              # MongoDB connection
│   └── src/
│       ├── controllers/
│       │   ├── authController.ts     # register, login
│       │   └── taskController.ts     # CRUD handlers
│       ├── middleware/
│       │   └── authMiddleware.ts     # JWT guard
│       ├── models/
│       │   ├── Task.ts
│       │   └── User.ts
│       ├── routes/
│       │   ├── authRoutes.ts
│       │   └── taskRoutes.ts
│       └── services/
│           └── TaskManager.ts        # Factory pattern
└── frontend/
    └── src/
        ├── lib/
        │   ├── api.ts                # Typed API client
        │   ├── auth-context.tsx      # Auth state + localStorage
        │   └── tasks-context.tsx     # Tasks state + optimistic updates
        ├── components/
        │   ├── DashboardShell.tsx    # Layout + sidebar + auth guard
        │   ├── KanbanBoard.tsx       # Board with status columns
        │   ├── TaskCard.tsx
        │   └── NewTaskDialog.tsx
        └── routes/
            ├── login.tsx
            ├── register.tsx
            ├── board.tsx
            ├── today.tsx
            ├── upcoming.tsx
            └── ...
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
JWT_SECRET=your-secret-key-change-in-production
```

Start the server:

```bash
npm start
# Runs on http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://127.0.0.1:4000`.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/tasks` | Yes | Get all tasks |
| POST | `/api/tasks` | Yes | Create a task |
| PATCH | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

## Usage

1. Open `http://localhost:5173/register` and create an account
2. Log in at `/login`
3. Create tasks using the **New task** button in the top-right
4. Use the sidebar to navigate between Board, Today, Upcoming, Done, and Workspaces
5. On the board, hover a task to advance its status (`→`) or delete it
