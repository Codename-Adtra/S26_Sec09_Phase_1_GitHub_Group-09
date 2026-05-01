// Public word bank route — returns a randomized batch of words for typing tests.

import { Router, Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../config/db";

const router = Router();

const querySchema = z.object({
    count: z.coerce.number().int().positive().max(500).default(200)
});

// GET / - returns { words: string[] } sampled randomly from the word_bank table.
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = querySchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ error: { status: 400, message: "Invalid count parameter" } });
        }

        const { count } = parsed.data;

        const rows = await prisma.$queryRaw<{ word: string }[]>(
            Prisma.sql`SELECT word FROM word_bank ORDER BY RANDOM() LIMIT ${count}`
        );

        return res.json({ words: rows.map(r => r.word) });
    } catch (err) {
        next(err);
    }
});

export default router;
