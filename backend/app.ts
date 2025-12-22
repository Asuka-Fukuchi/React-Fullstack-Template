// Express設定

import express from "express";
import cors from "cors";

// 使用するRouterをインポート

const app = express();

app.use(cors());
app.use(express.json());

// Route定義
// app.use("/api/auth", authRoutes);など

export default app;