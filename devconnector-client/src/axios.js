// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default instance;