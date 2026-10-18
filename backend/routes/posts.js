import { Router } from "express";
import Post from "../models/Post.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

// ---------- PUBLIC: anyone can read ----------

// GET /api/posts  -> all posts, newest first
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/posts/:id  -> one post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch {
    res.status(400).json({ message: "Invalid post id" });
  }
});

// ---------- ADMIN ONLY: create, update, delete ----------

// POST /api/posts
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/posts/:id
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/posts/:id
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch {
    res.status(400).json({ message: "Invalid post id" });
  }
});

export default router;
