// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://devconnect-1-ermh.onrender.com/api", // ✅ add `/api` here if your backend uses it in routes
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
