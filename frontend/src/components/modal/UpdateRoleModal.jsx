import React, { useState } from "react";

const UpdateRoleModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || "User");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center backdrop-blur-md">
      <div className="bg-gradient-to-br from-blue-900 to-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        
        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Update User Role
        </h2>

        {/* User Info */}
        <div className="mb-4">
          <p className="text-gray-300"><strong>Name:</strong> {user?.name}</p>
          <p className="text-gray-300"><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* Role Selection */}
        <label className="block font-medium text-gray-200 mb-2">
          Select Role:
        </label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="Admin">Admin</option>
          <option value="Shipper">Shipper</option>
          <option value="Carrier">Carrier</option>
          <option value="User">User</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdate(user._id, selectedRole)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoleModal;
