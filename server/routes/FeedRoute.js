import express from "express";
import { feeds_postFeed, feeds_getAllFeeds, feeds_likeFeed, feeds_commentFeed, feeds_getFeedComment, feeds_saveFeed } from "../controllers/FeedController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.post("/", validateAuth, feeds_postFeed);
router.get("/all", feeds_getAllFeeds);
router.patch("/:id", validateAuth, feeds_likeFeed);
router.patch("/comment/:id", validateAuth, feeds_commentFeed);
router.get("/comment/:id", feeds_getFeedComment);
router.patch("/save/:id", validateAuth, feeds_saveFeed);

export default router;