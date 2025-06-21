const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");


const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoute = require("./routes/uploadRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "https://devcon-phi.vercel.app", // ✅ Your Vercel frontend URL
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));

// Deploy React frontend (build folder)
app.use(express.static(path.join(__dirname, "../devconnector-client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../devconnector-client/dist/index.html"));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
