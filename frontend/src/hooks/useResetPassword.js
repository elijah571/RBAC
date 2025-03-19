import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ resetToken, newPassword }) => {
    if (!resetToken || !newPassword) {
      toast.error("All fields are required");
      return { success: false };
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return { success: false };
    }

    setLoading(true);
    try {
      const { data } = await axios.put(`/api/auth/reset-password/${resetToken}`, {
        newPassword,
      });

      toast.success(data.message || "Password reset successfully!");
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Reset failed";
      toast.error(errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

export default useResetPassword;
