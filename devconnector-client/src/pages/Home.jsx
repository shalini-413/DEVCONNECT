import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="max-w-xl w-full bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">🚀 Welcome to DevConnector</h1>
        <p className="text-gray-600 mb-8">
          Connect with developers, share your thoughts, and grow your network.
          Create posts, update your profile, and explore others' suggestions!
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
