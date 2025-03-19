import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useRequestResetToken = () => {
  const [loading, setLoading] = useState(false);

  const requestResetToken = async (email) => {
    if (!email) {
      toast.error("Please enter your email");
      return false; // Return false when no email is provided
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/reset-token", { email });
      toast.success(data.message || "Reset password link sent to email.");
      return true; // ✅ Return success
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Request failed";
      toast.error(errorMessage);
      return false; // ✅ Return failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, requestResetToken };
};

export default useRequestResetToken;
