import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const handleInputErrors = ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
};

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async ({ name, email, password, confirmPassword }) => {
    const isValid = handleInputErrors({ name, email, password, confirmPassword });
    if (!isValid) return { success: false };

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", { name, email, password });

      toast.success("Signup successful! Please verify your email.");
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      console.log("Signup response:", data);

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
