import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

// Get all posts
// router.get("/", authenticateToken, getPosts);
router.get("/", getPosts);

// Get single post
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

// Update Existing post
router.put("/:id", updatePost);

// Delete post
router.delete("/:id", deletePost);

export default router;
