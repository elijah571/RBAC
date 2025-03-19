import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useVerifyAccount = () => {
  const { setAuthUser } = useAuthContext(); // Access setAuthUser from context
  const [loading, setLoading] = useState(false);

  const verifyAccount = async (verificationToken) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-account", {
        verificationToken,
      });

      toast.success(data.message || "Account verified successfully!");

      // ✅ Save verified user to localStorage & context using "user" key
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthUser(data.user);

      return { success: true, user: data.user }; // Return success response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Verification failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage }; // Return failure response
    } finally {
      setLoading(false);
    }
  };

  return { loading, verifyAccount };
};

export default useVerifyAccount;
