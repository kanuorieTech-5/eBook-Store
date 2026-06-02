import express from "express";

import { registerUser, loginUser, getProfile, } from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// PROFILE
router.get("/profile", protect, getProfile);

export default router;