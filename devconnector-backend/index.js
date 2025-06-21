const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
