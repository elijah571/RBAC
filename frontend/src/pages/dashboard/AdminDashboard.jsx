import { HiArrowLeft } from "react-icons/hi"; // Import back arrow icon
import { Link } from "react-router-dom"; // Fix incorrect import
import GetAllUsers from "../users/GetAllUsers";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12 relative">
      {/* Back Button - Positioned Top Left */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500 transition duration-300 shadow-md"
      >
        <HiArrowLeft className="text-xl" /> Back to Home
      </Link>

      {/* Header Section */}
      <div className="bg-gray-800 w-full max-w-4xl rounded-lg shadow-lg p-6 mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-400">Admin Dashboard</h1>
        <p className="mt-2 text-gray-300">Manage users and administrative tasks efficiently.</p>
      </div>

      {/* User Management Section */}
      <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">User Management</h2>
        <GetAllUsers />
      </div>
    </div>
  );
};

export default AdminDashboard;
