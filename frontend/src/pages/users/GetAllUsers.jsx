import React, { useEffect, useState } from "react";
import useUserManagement from "../../hooks/useUserManagement";
import UpdateRoleModal from "../../components/modal/UpdateRoleModal";

const GetAllUsers = () => {
  const { users, fetchAllUsers, updateUserRole, deleteUser, loading } = useUserManagement();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Update Role
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Show Modal when a user is selected */}
      {selectedUser && (
        <UpdateRoleModal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          onUpdate={(userId, role) => {
            updateUserRole(userId, role);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default GetAllUsers;
