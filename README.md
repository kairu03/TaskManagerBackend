# 📌 Task Manager API

[![Run Tests](https://github.com/kairu03/TaskManagerBackend/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/kairu03/TaskManagerBackend/actions/workflows/test.yml)

A production-ready RESTful Task Manager API built with **Node.js, Express, MongoDB, and JWT authentication**, designed with scalability, security, automated testing, and CI/CD integration in mind.

This project demonstrates real-world backend engineering practices including authentication & authorization, modular architecture, centralized error handling, automated testing, and continuous integration/deployment.

---

## 🌐 Live Demo

- Base API URL:
https://task-manager-api-backend.onrender.com

- Swagger Documentation:
https://task-manager-api-backend.onrender.com/api-docs

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Jest & Supertest
- Github Actions (CI)
- Render (Deployment)
- Swagger

---

## 📂 Project Structure

```plaintext
task-manager-backend/
├── .github/
│   └── workflows/
│       └── test.yml
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .babelrc
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## ✨ Features

- 🔐 JWT-based Authentication (Register & Login)
- 🛡 Protected Routes with User Ownership Authorization
- 📦 Full CRUD Operations for Task Management
- 🔒 Secure Password Hashing using bcrypt
- ✅ Request Validation Middleware for Data Integrity
- ⚠ Centralized Global Error Handling with Async Wrapper
- 🧪 Automated Integration Testing using Jest & Supertest
- 🗄 Isolated Test Database Configuration (Environment-based)
- 🔄 Continuous Integration via GitHub Actions (Automated Test Runs on Push)
- 🚀 Continuous Deployment with Automatic Redeploy on Render
- 📄 Swagger API Documentation
- 🔎 API Testing & Validation using Swagger UI and Postman
- 🛡 Security Best Practices (Rate Limiting, HTTP Security Headers, Environment Variables)

---

## 💻 Local Development

- After running locally:

 http://localhost:5000/api-docs

---

## 🔑 Authentication Flow

1. User registers with email & password.
2. Password is hashed before saving to the database.
3. User logs in and receives a JWT token.
4. Token must be included in request headers:
  Authorization: Bearer <your_token>
5. Protected routes verify the token and attach the user to `req.user`.

---

## 🛠 Error Handling

- Custom `ApiError` class
- Async handler to catch rejected promises
- Global error middleware
- Consistent error response format:

```json
{
  "success": false,
  "message": "Error message here"
}
```
--- 

## 🔧 Installation & Setup

1. Clone the repository

- git clone <your-repo-url>
- cd task-manager-api

2. Install dependencies

- npm install

3. Create a .env file in the root directory with the following variables:

- PORT - The port your server runs on (e.g., `5000`)
- MONGO_URI - Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
- JWT_SECRET - Secret key for signing JWT tokens
- CLIENT_URL - Frontend URL(s) for CORS (optional, e.g., `http://localhost:3000`)
- NODE_ENV - Environment mode (`development` or `production`)

4. Run the server

- npm run dev

Server runs at:

- http://localhost:5000

---

### 👨‍💻 Author<br>
Khylemikel Francisco<br>
Aspiring Full-Stack Developer specializing in Backend


