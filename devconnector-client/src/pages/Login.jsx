import React, { useState } from "react";
import axios from "../axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setMsg(err.response.data.msg || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-4">Login</button>
      </form>
      {msg && <p className="mt-4 text-red-500">{msg}</p>}
    </div>
  );
};

export default Login;
