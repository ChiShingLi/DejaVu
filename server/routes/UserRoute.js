import express from "express";
import { users_registerUser, users_userlogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", users_registerUser);
router.post("/login", users_userlogin);

export default router;
