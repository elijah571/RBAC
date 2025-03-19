import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useUserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  // Get all users (Admin only)
  const fetchAllUsers = async () => {
    setLoading(true);
    console.log("Fetching all users...");
    try {
      const { data } = await axios.get("/api/user", { withCredentials: true });
      console.log("Users fetched successfully:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Get a user by ID (Admin only)
  const fetchUserById = async (userId) => {
    setLoading(true);
    console.log(`Fetching user with ID: ${userId}...`);
    try {
      const { data } = await axios.get(`/api/user/${userId}`, { withCredentials: true });
      console.log("User fetched successfully:", data);
      setUserDetails(data);
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  //Update user role (Admin only)
  const updateUserRole = async (userId, role) => {
    setLoading(true);
    console.log(`Updating user role for ID: ${userId} to ${role}...`);
    try {
      await axios.put(`/api/user/update-user-role/${userId}`, { role }, { withCredentials: true });
      console.log(`User role updated successfully for ID: ${userId}`);
      toast.success("User role updated successfully!");
      fetchAllUsers(); 
    } catch (error) {
      console.error(`Error updating user role for ${userId}:`, error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  //  Delete user (Admin only)
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoading(true);
    console.log(`Deleting user with ID: ${userId}...`);
    try {
      await axios.delete(`/api/user/delete/${userId}`, { withCredentials: true });
      console.log(`User with ID: ${userId} deleted successfully.`);
      toast.success("User deleted successfully!");
      fetchAllUsers(); // Refresh list after deletion
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    users,
    userDetails,
    fetchAllUsers,
    fetchUserById,
    updateUserRole,
    deleteUser,
  };
};

export default useUserManagement;
