import express from "express";
import { createSupportTicket } from "../controllers/supportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSupportTicket);

export default router;