// TypeShi backend entry point: wires middleware, mounts routes, and starts the server.

import { env } from "./config/env";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.routes";
import testRoutes from "./routes/test.routes";
import wordRoutes from "./routes/word.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const allowedOrigins = env.CORS_ORIGIN.split(",").map(o => o.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400
}));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/words", wordRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: { status: 404, message: "Not found" } });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`TypeShi backend listening on port ${env.PORT}`);
});
