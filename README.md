# React + TypeScript + Vite + Node.js + Express + MongoDB Template

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
