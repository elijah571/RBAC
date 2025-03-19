import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
