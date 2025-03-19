import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Home = () => {
  const { loading, logout } = useLogout(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Connect, collaborate, and achieve more together.
        </p>

        <div className="flex space-x-4">
          
          <Link
            to="/admin"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 shadow-md"
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300 shadow-md disabled:bg-gray-500"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
