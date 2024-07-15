import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", loginUser);

// Log out a user
router.post("/logout", logoutUser);

// Get user profile
router.get("/profile", authenticateToken, getUserProfile);

// Update user profile
router.put("/profile", authenticateToken, updateUserProfile);

export default router;
