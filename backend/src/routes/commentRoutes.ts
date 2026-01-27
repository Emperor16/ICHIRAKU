import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const router = Router();

//POST /api/comments - Create a new comment (protected)
router.post("/:productId", requireAuth(), commentController.createComment);

//DELETE /api/comments/:id - Delete a comment by ID (protected)
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;