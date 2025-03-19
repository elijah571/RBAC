import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
const Home = () => {
  const { loading, logout } = useLogout(); // Get logout function and loading state

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-600 mb-6">
          Connect, collaborate, and achieve more together.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
          <button
            onClick={logout}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
