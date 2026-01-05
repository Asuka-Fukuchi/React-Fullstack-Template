# React + TypeScript + Vite + Node.js + Express + MongoDB Template

## Purpose
This repository is a reusable full-stack template
designed for small to mid-size React applications
that require authentication and CRUD features.

It is suitable for:
- personal projects
- portfolio applications
- rapid prototyping of SaaS-style apps

It was created to:
- avoid rewriting authentication logic for each project
- keep frontend and backend responsibilities clearly separated
- enforce consistent architecture across projects

---

## Key Features

### Authentication
- JWT-based login and registration
- Token storage and session restoration
- Automatic logout on token expiration
- Admin role is controlled only by backend

### Frontend Architecture
- Context + Service separation
- Typed API communication using TypeScript
- Centralized API client
- Reusable CRUD context pattern

### Backend Architecture
- Controller / Service / Model separation
- Password hashing with bcrypt
- Auth middleware for protected routes

## Folder Structure
```bash
react-fullstack-template/
├─ frontend/
│   ├─ public/
│   │   └── assets/
│   ├── src/
│   │   ├── api/           # API call
│   │   ├── components/    
│   │   ├── context/       # Context providers
│   │   ├── pages/ 
│   │   ├── services/      # Service modules for API calls
│   │   ├── types/         # For TypeScript
│   │   ├── utils/         # Helper
│   │   └── App.tsx 
│   ├─ package.json
│   ├─ tsconfig.json
│   └─ vite.config.ts
│
├─ backend/
│   ├─ config/          # DB接続や環境設定
│   ├─ controllers/     # ルートごとの処理
│   ├─ middleware/      # 認証・エラーハンドリング
│   ├─ models/          # For Database
│   ├─ routes/          # API ルート
│   ├─ services/        # DB操作 + ビジネスロジック
│   ├─ types/           # For TypeScript 
│   ├─ .env
│   ├─ Dockerfile
│   ├─ openapi.yaml
│   ├─ app.ts           # Express
│   ├─ server.ts        # Server起動
│   ├─ tsconfig.json
│   └─ package.json
│
├─ docker-compose.yml
├─ README.md
└─ .gitignore
```


## Used in
This template was extracted from a real application:
Schedule Planner App
https://github.com/Asuka-Fukuchi/schedule-planner
- User authentication
- Event CRUD operations
- Session persistence

The application was built first,
and this template was later generalized
to improve reusability and maintainability.