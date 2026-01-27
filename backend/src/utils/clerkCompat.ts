import { requireAuth as rawRequireAuth } from "@clerk/express";
import type { RequestHandler } from "express";

// Some Clerk versions export requireAuth as a RequestHandler,
// others as a function returning a RequestHandler.
// This wrapper normalizes both cases.
export const requireAuthCompat: RequestHandler =
  typeof rawRequireAuth === "function"
    ? (rawRequireAuth as () => RequestHandler)()
    : (rawRequireAuth as RequestHandler);