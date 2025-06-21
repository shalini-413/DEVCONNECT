import React, { useEffect, useState } from "react";
import axios from "../axios";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("auth/dashboard", {
          headers: { Authorization: token },
        });
        setMessage(res.data.msg);
      } catch (err) {
        setMessage("Access Denied");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <p>{message}</p>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
>
  Logout
</button>

    </div>
  );
};

export default Dashboard;
