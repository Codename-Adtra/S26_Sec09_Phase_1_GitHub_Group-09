// User account routes: fetch/upsert current user and update username.

import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../config/db";
import { requireAuth, extractUser } from "../middleware/auth";

const router = Router();

const usernameSchema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/)
});

// Build a unique-ish username from the email prefix plus 4 random digits.
function generateUsername(email: string): string {
    const prefix = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16) || "user";
    const digits = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${digits}`;
}

// GET /me - upserts the user record by auth0Id; returns the safe profile fields.
router.get("/me", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const { auth0Id, email } = req.user;

        let user;
        try {
            user = await prisma.user.upsert({
                where: { auth0Id },
                create: {
                    auth0Id,
                    email,
                    username: generateUsername(email)
                },
                update: { email }
            });
        } catch (err: any) {
            // Email belongs to an existing account — link this auth0Id to it.
            if (err?.code === "P2002") {
                user = await prisma.user.update({
                    where: { email },
                    data: { auth0Id }
                });
            } else {
                throw err;
            }
        }

        return res.json({
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt
        });
    } catch (err) {
        next(err);
    }
});

// PUT /me - updates the current user's username after Zod validation.
router.put("/me", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const parsed = usernameSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: { status: 400, message: "Invalid username (3-20 chars, letters/numbers/underscore only)" }
            });
        }

        const existing = await prisma.user.findUnique({ where: { auth0Id: req.user.auth0Id } });
        if (!existing) {
            return res.status(404).json({ error: { status: 404, message: "User not found." } });
        }

        const updated = await prisma.user.update({
            where: { id: existing.id },
            data: { username: parsed.data.username }
        });

        return res.json({
            id: updated.id,
            email: updated.email,
            username: updated.username,
            createdAt: updated.createdAt
        });
    } catch (err) {
        next(err);
    }
});

export default router;
