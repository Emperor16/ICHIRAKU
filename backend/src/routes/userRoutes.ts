import { Router } from "express";
import { syncUser } from "../controllers/userController.js";
import { requireAuthCompat } from "../utils/clerkCompat.js"; 

const router = Router();

// api/users/sync - POST ==> Sync the Clerk user to the DB (protected route)
router.post("/sync", requireAuthCompat, syncUser);

export default router;