import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/auth/dashboard", { headers: { Authorization: token } }) // Simulating get user
      .then((res) => {
        setFormData({
          name: res.data.user?.name || "",
          email: res.data.user?.email || "",
        });
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "/auth/profile",
        formData,
        { headers: { Authorization: token } }
      );
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
