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
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ test.yml
├── 📁 src
│   ├── 📁 config
│   ├── 📁 controllers
│   ├── 📁 middlewares
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 tests
│   ├── 📁 utils
│   ├── 📄 app.js
│   └── 📄 server.js
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

---

## 🔑 Authentication Flow

1. User registers with name, email, and password.
2. Password is securely hashed using bcrypt before being stored in the database.
3. Upon successful login, the server generates a signed JWT.  
4. The client includes the token in the request header: Authorization: `Bearer <token>`
5. Authentication middleware verifies the token signature and:
  - Extracts the user ID from the payload
  - Validates the user exists
  - Attaches the user object to req.user
6. Protected routes enforce ownership checks to ensure users can only access their own resources.

---

## 🔐 Security Considerations

- **Password Hashing**: 
User passwords are hashed using bcrypt before being stored in the database to prevent exposure in case of data breaches.

- **JWT Authentication**: 
Tokens are signed using a secret key stored in environment variables and verified on each protected request.

- **Environment Variables**: 
Sensitive data such as JWT secrets and database URIs are stored in .env files and excluded from version control.

- **Authorization & Ownership Checks**: 
Protected routes ensure users can only access and modify their own resources.

- **Centralized Error Handling**: 
Error responses are standardized to prevent leaking sensitive internal details.

- **Request Validation Middleware**: 
Incoming requests are validated to prevent malformed or malicious data from entering the system.

- **Test Environment Isolation**: 
Automated tests run against a separate test database to avoid contaminating production data.

---

## ✨ Features

- 🔐 JWT-based Authentication (Register, Login, Protected Routes)
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

- git clone https://github.com/kairu03/task-manager-api.git
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

5. Access the API

- http://localhost:5000

---

### 👨‍💻 Author<br>
Khylemikel Francisco<br>
Aspiring Full-Stack Developer specializing in Backend


