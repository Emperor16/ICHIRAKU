import { requireAuth as rawRequireAuth } from "@clerk/express";
import type { RequestHandler } from "express";

// Clerk v1.7+ exports requireAuth as a factory, so call it directly.
// If Clerk ever changes to export middleware directly, this will still work.
export const requireAuthCompat: RequestHandler = rawRequireAuth();