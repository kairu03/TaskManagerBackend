# 📌 Task Manager API

A production-ready RESTful Task Manager API built with **Node.js, Express, MongoDB, and JWT authentication**.

This project demonstrates secure backend architecture including JWT authentication, authorization, validation, centralized error handling, and structured middleware layering.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Swagger

---

## ✨ Features

- 🔐 JWT-based Authentication (Register & Login)
- 🛡 Protected Routes with User Ownership Checks
- 📦 Full CRUD Operations for Tasks
- 🔒 Password hashing using bcrypt
- ✅ Request Validation Middleware
- ⚠ Centralized Global Error Handling
- 🔄 Async Error Handling Wrapper
- 📄 Swagger API Documentation
- 🧪 Tested and validated API endpoints using Swagger UI and Postman.

---

## 📂 Project Structure

```text
task-manager-backend/
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   └── server.js
├── .env
├── package.json
└── package-lock.json

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


--- 

## 📄 Swagger Documentation

- Interactive API documentation available at:

/api-docs

---

## 🔧 Installation & Setup

```markdown
1. Clone the repository

```bash
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

http://localhost:5000

---

### 👨‍💻 Author

Khylemikel Francisco
Aspiring Full-Stack Developer specializing in Backend

