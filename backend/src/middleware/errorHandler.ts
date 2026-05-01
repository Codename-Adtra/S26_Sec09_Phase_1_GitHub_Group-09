// Centralized Express error handler — formats all errors as JSON.

import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    let status = 500;
    let message = env.NODE_ENV === "production" ? "Internal server error" : (err?.message ?? "Internal server error");

    if (err?.status === 401 || (typeof err?.name === "string" && err.name.includes("Unauthorized"))) {
        status = 401;
        message = "Unauthorized";
    } else if (err instanceof SyntaxError && (err as any).status === 400) {
        status = 400;
        message = "Invalid JSON";
    } else if (err?.code === "P2002") {
        status = 409;
        message = "Already exists";
    } else if (err?.code === "P2025") {
        status = 404;
        message = "Not found";
    } else if (typeof err?.status === "number") {
        status = err.status;
        message = err.message ?? message;
    }

    res.status(status).json({ error: { status, message } });
}
