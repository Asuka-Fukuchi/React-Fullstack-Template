// Server起動

import * as dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
    }
}

startServer();