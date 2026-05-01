// Typing test routes: create, list (paginated), aggregate stats, and delete.

import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../config/db";
import { requireAuth, extractUser } from "../middleware/auth";

const router = Router();

// Validation messages mirror Phase 4 Use Case wording (BeginTypingTest / CompleteTypingTest).
const createTestSchema = z.object({
    wpm: z.number().positive(),
    accuracy: z.number().min(0).max(100),
    duration: z.number().int().positive({ message: "Duration must be greater than 0" }),
    totalChars: z.number().int().nonnegative({ message: "Character counts cannot be negative" }),
    correctChars: z.number().int().nonnegative({ message: "Character counts cannot be negative" })
});

const listQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20)
});

const uuidSchema = z.string().uuid();

// Strip internal field before sending tests back to the client.
function stripUserId<T extends { userId?: string }>(test: T): Omit<T, "userId"> {
    const { userId, ...rest } = test;
    return rest;
}

// POST / - record a completed typing test for the authenticated user.
router.post("/", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const parsed = createTestSchema.safeParse(req.body);
        if (!parsed.success) {
            const message = parsed.error.errors[0]?.message ?? "Invalid request body";
            return res.status(400).json({ error: { status: 400, message } });
        }

        const { wpm, accuracy, duration, totalChars, correctChars } = parsed.data;

        // Mirrors CompleteTypingTestUseCase test cases 4 & 5.
        if (totalChars < 0 || correctChars < 0) {
            return res.status(400).json({
                error: { status: 400, message: "Character counts cannot be negative" }
            });
        }

        // Mirrors CompleteTypingTestUseCase test case 6.
        if (correctChars > totalChars) {
            return res.status(400).json({
                error: { status: 400, message: "Correct characters cannot be greater than total characters" }
            });
        }

        const user = await prisma.user.findUnique({ where: { auth0Id: req.user.auth0Id } });
        if (!user) {
            return res.status(404).json({ error: { status: 404, message: "User not found." } });
        }

        const test = await prisma.typingTest.create({
            data: {
                userId: user.id,
                wpm,
                accuracy,
                duration,
                totalChars,
                correctChars
            }
        });

        return res.status(201).json(stripUserId(test));
    } catch (err) {
        next(err);
    }
});

// GET / - paginated list of the authenticated user's tests, newest first.
router.get("/", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const parsedQuery = listQuerySchema.safeParse(req.query);
        if (!parsedQuery.success) {
            return res.status(400).json({ error: { status: 400, message: "Invalid query parameters" } });
        }

        const { page, limit } = parsedQuery.data;

        const user = await prisma.user.findUnique({ where: { auth0Id: req.user.auth0Id } });
        if (!user) {
            return res.status(404).json({ error: { status: 404, message: "User not found." } });
        }

        const [tests, totalCount] = await Promise.all([
            prisma.typingTest.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit
            }),
            prisma.typingTest.count({ where: { userId: user.id } })
        ]);

        return res.json({
            tests: tests.map(stripUserId),
            pagination: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    } catch (err) {
        next(err);
    }
});

// GET /stats - aggregate metrics for the user's profile dashboard.
router.get("/stats", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const user = await prisma.user.findUnique({ where: { auth0Id: req.user.auth0Id } });
        if (!user) {
            return res.status(404).json({ error: { status: 404, message: "User not found." } });
        }

        const agg = await prisma.typingTest.aggregate({
            where: { userId: user.id },
            _avg: { wpm: true, accuracy: true },
            _max: { wpm: true },
            _count: { _all: true }
        });

        return res.json({
            avgWpm: agg._avg.wpm ? Number(agg._avg.wpm) : 0,
            bestWpm: agg._max.wpm ? Number(agg._max.wpm) : 0,
            totalTests: agg._count._all,
            avgAccuracy: agg._avg.accuracy ? Number(agg._avg.accuracy) : 0
        });
    } catch (err) {
        next(err);
    }
});

// DELETE /:id - remove one of the user's own tests.
router.delete("/:id", requireAuth, extractUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: { status: 401, message: "Unauthorized" } });
        }

        const idParse = uuidSchema.safeParse(req.params.id);
        if (!idParse.success) {
            return res.status(400).json({ error: { status: 400, message: "Invalid id format" } });
        }

        const user = await prisma.user.findUnique({ where: { auth0Id: req.user.auth0Id } });
        if (!user) {
            return res.status(404).json({ error: { status: 404, message: "User not found." } });
        }

        const result = await prisma.typingTest.deleteMany({
            where: { id: idParse.data, userId: user.id }
        });

        if (result.count === 0) {
            return res.status(404).json({ error: { status: 404, message: "Test not found." } });
        }

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default router;
