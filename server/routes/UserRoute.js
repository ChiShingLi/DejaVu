import express from "express";
import { users_getCurrentUserDetails, users_registerUser, users_userlogin, users_updateUserCard } from "../controllers/UserController.js";
import { validateAuth } from "../middlewares/ValidateAuth.js";

const router = express.Router();
router.get("/", validateAuth, users_getCurrentUserDetails);
router.post("/register", users_registerUser);
router.post("/login", users_userlogin);
router.patch("/updateCard", validateAuth, users_updateUserCard);

export default router;
