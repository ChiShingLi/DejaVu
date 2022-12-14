import express from "express";
import { users_getFeedUserDetails, users_getCurrentUserDetails, users_registerUser, users_userlogin, users_updateUserCard, users_followUser, users_getUserProfile, users_changePassword } from "../controllers/UserController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.get("/", validateAuth, users_getCurrentUserDetails);
router.get("/:id", users_getFeedUserDetails);
router.post("/register", users_registerUser);
router.post("/login", users_userlogin);
router.patch("/updateCard", validateAuth, users_updateUserCard);
router.patch("/follow/:id", validateAuth, users_followUser);
router.get("/profile/:username", users_getUserProfile);
router.patch("/changePassword", validateAuth, users_changePassword);
export default router;
