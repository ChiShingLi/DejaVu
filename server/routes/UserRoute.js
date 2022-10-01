import express from "express";
import { users_getFeedUserDetails, users_getCurrentUserDetails, users_registerUser, users_userlogin, users_updateUserCard, users_followUser } from "../controllers/UserController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.get("/", validateAuth, users_getCurrentUserDetails);
router.get("/:id", users_getFeedUserDetails);
router.post("/register", users_registerUser);
router.post("/login", users_userlogin);
router.patch("/updateCard", validateAuth, users_updateUserCard);
router.patch("/follow/:id", validateAuth, users_followUser);
export default router;
