// Express設定

import express from "express";
import cors from "cors";

// 使用するRouterをインポート
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Route定義
// app.use("/api/auth", authRoutes);など
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;