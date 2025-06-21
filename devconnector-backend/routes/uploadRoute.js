// routes/uploadRoute.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route
router.post("/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    const avatarPath = `http://localhost:5000/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user, { avatar: avatarPath });
    res.json({ msg: "Avatar uploaded", avatar: avatarPath });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

module.exports = router;
