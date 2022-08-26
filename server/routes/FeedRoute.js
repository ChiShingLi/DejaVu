import express from "express";
import { feeds_postFeed, feeds_getAllFeeds, feeds_likeFeed } from "../controllers/FeedController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.post("/", validateAuth, feeds_postFeed);
router.get("/all", feeds_getAllFeeds);
router.patch("/:id", validateAuth, feeds_likeFeed);
export default router;