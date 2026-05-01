// Shared Prisma client instance used by routes throughout the app.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
