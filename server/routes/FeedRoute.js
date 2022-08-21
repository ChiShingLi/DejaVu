import express from "express";
import { feeds_postFeed } from "../controllers/FeedController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.post("/", validateAuth, feeds_postFeed);

export default router;