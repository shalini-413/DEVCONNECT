// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

import axios from "axios";

export default axios.create({
  baseURL: "https://devconnect-1-ermh.onrender.com/api",
  withCredentials: true,
});
