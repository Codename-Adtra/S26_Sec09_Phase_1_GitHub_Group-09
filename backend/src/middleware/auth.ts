// Auth0 JWT validation and user-info extraction middleware.

import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { env } from "../config/env";

export const requireAuth = auth({
    issuerBaseURL: `https://${env.AUTH0_DOMAIN}/`,
    audience: env.AUTH0_AUDIENCE
});

// Pulls auth0Id (sub) and email from the validated JWT payload onto req.user.
export function extractUser(req: Request, _res: Response, next: NextFunction): void {
    const payload = (req as any).auth?.payload;
    const auth0Id: string | undefined = payload?.sub;
    const email: string | undefined = payload?.email ?? payload?.["email"];

    if (auth0Id && email) {
        req.user = { auth0Id, email };
    }

    next();
}
