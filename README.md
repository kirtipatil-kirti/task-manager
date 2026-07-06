# 📋 Task Manager

A full-stack task management web application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in securely, and manage their personal tasks with priorities, due dates, and status tracking.


Render llve url for backend:https://task-manager-zv25.onrender.com
Vercel live url for frontend:https://task-manager-rouge-gamma-94.vercel.app

## 🚀 Features

- **Authentication** — Secure register/login with JWT tokens and bcrypt password hashing
- **Protected routes** — Users can only view and manage their own tasks
- **Task management** — Create, read, update, and delete tasks
- **Task organization** — Priority levels (low/medium/high), status tracking (To Do / In Progress / Done), and due dates
- **Search & filter** — Live search by title/description, filter by status and priority
- **Inline editing** — Edit tasks directly without leaving the page
- **Overdue detection** — Tasks past their due date are flagged automatically
- **Toast notifications** — Real-time feedback for every action
- **Responsive UI** — Clean, modern design that works on different screen sizes

## 🛠️ Tech Stack

**Frontend:** React (Vite), React Router, Axios, custom CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose ODM), hosted on MongoDB Atlas
**Auth:** JSON Web Tokens (JWT), bcrypt.js

## 📁 Project Structure



## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- A MongoDB Atlas account (free tier works)

### Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:


Run the server:
```bash
node server.js
```

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔑 API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in a user | No |
| GET | `/api/tasks` | Get all tasks for logged-in user | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

## 🧠 What I learned

- Implementing secure authentication with JWT and bcrypt
- Building protected API routes with custom middleware
- Managing global auth state in React with Context API
- Debugging real-world deployment issues (e.g. MongoDB Atlas SRV DNS resolution failures on certain networks, resolved by using the legacy connection string format)
- Designing a clean, usable UI from scratch with plain CSS

## 📌 Future improvements

- Refresh tokens for better session security
- Pagination for large task lists
- Unit and integration tests
- Dark mode

## 👤 Author

Kirti Patil
