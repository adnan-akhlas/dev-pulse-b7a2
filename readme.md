# DevPulse API

A simple issue tracking REST API built with TypeScript, Express.js, and PostgreSQL.  
Users can create bug reports or feature requests, while maintainers can manage all issues.

---

## 🚀 Live Links

- GitHub Repo: `https://github.com/adnan-akhlas/dev-pulse-b7a2`
- Live API: `https://dev-pulse-b7a2-aa.vercel.app/`
- Interview Video: `https://youtu.be/bk7kSZS8p8I`

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- http-errors
- http-status
- ESLint
- Husky
- Commitlint
- pnpm

---

## ✨ Features

- JWT Authentication
- Role-based Authorization
- Password Hashing with bcrypt
- Create / Update / Delete Issues
- Filter & Sort Issues
- PostgreSQL Raw SQL Queries
- Centralized Error Handling
- Modular Architecture
- ESLint + Commitlint + Husky Setup

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/adnan-akhlas/dev-pulse-b7a2

cd dev-pulse-b7a2
```

---

## Install Dependencies

```bash
pnpm install
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_secret_key

BCRYPT_SALT_ROUNDS=10
```

---

# ▶️ Scripts

```json
{
  "start": "node ./dist/server.js",
  "dev": "tsx watch --clear-screen=false ./src/server.ts",
  "build": "tsup",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prepare": "husky"
}
```

---

# ▶️ Run Project

## Development

```bash
pnpm dev
```

## Build Project

```bash
pnpm build
```

## Production

```bash
pnpm start
```

---

# 📁 Folder Structure

```bash
.
├── src
│   ├── config
│   ├── db
│   ├── interfaces
│   ├── middlewares
│   ├── modules
│   │   ├── auth
│   │   ├── issues
│   │   └── users
│   ├── utils
│   ├── app.ts
│   └── server.ts
├── dist
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── compose.yaml
├── vercel.json
└── readme.md
```

---

# 🗄️ Database Schema

## Users Table

| Column     | Type        | Constraints               |
| ---------- | ----------- | ------------------------- |
| id         | SERIAL      | PRIMARY KEY               |
| name       | VARCHAR(50) | NOT NULL                  |
| email      | VARCHAR(50) | UNIQUE, NOT NULL          |
| password   | TEXT        | NOT NULL                  |
| role       | VARCHAR(20) | DEFAULT `'contributor'`   |
| created_at | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP |

---

## Issues Table

| Column      | Type         | Constraints                |
| ----------- | ------------ | -------------------------- |
| id          | SERIAL       | PRIMARY KEY                |
| title       | VARCHAR(150) | NOT NULL                   |
| description | TEXT         | NOT NULL                   |
| type        | VARCHAR(20)  | `bug` or `feature_request` |
| status      | VARCHAR(15)  | DEFAULT `'open'`           |
| reporter_id | INT          | REFERENCES users(id)       |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP  |
| updated_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP  |

---

# 🔐 Authentication APIs

---

## 1. Register User

### POST `/api/auth/signup`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor",
    "created_at": "2026-01-20T09:00:00Z",
    "updated_at": "2026-01-20T09:00:00Z"
  }
}
```

---

## 2. Login User

### POST `/api/auth/login`

### Request Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "contributor"
    }
  }
}
```

---

# 🐞 Issues APIs

---

## 3. Create Issue

### POST `/api/issues`

### Headers

```bash
Authorization: your_jwt_token
```

### Request Body

```json
{
  "title": "Database connection timeout",
  "description": "Database pool exhausted under heavy load",
  "type": "bug"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Database connection timeout",
    "description": "Database pool exhausted under heavy load",
    "type": "bug",
    "status": "open",
    "reporter_id": 1
  }
}
```

---

## 4. Get All Issues

### GET `/api/issues`

### Query Parameters

| Query  | Example                     |
| ------ | --------------------------- |
| sort   | newest, oldest              |
| type   | bug, feature_request        |
| status | open, in-progress, resolved |

### Example

```bash
/api/issues?sort=newest&type=bug&status=open
```

### Success Response

```json
{
  "success": true,
  "message": "Issues retrieved successfully",
  "data": []
}
```

---

## 5. Get Single Issue

### GET `/api/issues/:id`

### Example

```bash
/api/issues/1
```

### Success Response

```json
{
  "success": true,
  "message": "Issue retrieved successfully",
  "data": {
    "id": 1,
    "title": "Database connection timeout",
    "description": "Database pool exhausted under heavy load",
    "type": "bug",
    "status": "open"
  }
}
```

---

## 6. Update Issue

### PATCH `/api/issues/:id`

### Headers

```bash
Authorization: your_jwt_token
```

### Request Body

```json
{
  "title": "Updated issue title",
  "description": "Updated issue description",
  "type": "bug"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 1,
    "title": "Updated issue title",
    "description": "Updated issue description",
    "type": "bug",
    "status": "open"
  }
}
```

---

## 7. Delete Issue

### DELETE `/api/issues/:id`

### Headers

```bash
Authorization: your_jwt_token
```

### Success Response

```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

---

# ❌ Error Response

```json
{
  "success": false,
  "message": "Internal Server Error",
  "errors": {}
}
```

---

# 📌 HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

# 👨‍💻 Author

Adnan Bin Akhlas

- GitHub: [https://github.com/adnan-akhlas](https://github.com/adnan-akhlas)
