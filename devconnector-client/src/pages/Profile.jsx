import React, { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const res = await axios.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/upload/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar uploaded");
      fetchProfile();
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      {user.avatar && (
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 mx-auto mb-4 rounded-full border"
        />
      )}
      <p className="text-gray-700 mb-2">{user.name}</p>
      <p className="text-gray-500 mb-4">{user.email}</p>

      <input
        type="file"
        onChange={handleUpload}
        className="block mx-auto mb-4"
      />
    </div>
  );
};

export default Profile;
