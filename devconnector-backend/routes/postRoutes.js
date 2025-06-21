const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = new Post({ user: req.user, title, body });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get User Posts
router.get("/", authMiddleware, async (req, res) => {
  const posts = await Post.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(posts);
});

// Update Post
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, body } = req.body;
  const post = await Post.findOne({ _id: req.params.id, user: req.user });
  if (!post) return res.status(404).json({ msg: "Post not found" });

  post.title = title;
  post.body = body;
  await post.save();
  res.json(post);
});

// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json({ msg: "Post deleted" });
});

module.exports = router;
