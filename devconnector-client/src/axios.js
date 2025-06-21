// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

import axios from "axios";

const instance = axios.create({
  baseURL: "https://devconnect-o24y.onrender.com/api/", // ✅ Make sure `/api/` is included
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Important for sending cookies / auth
});

export default instance;

