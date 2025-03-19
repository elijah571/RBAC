import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ProtectedAdminRoute = () => {
  const { authUser } = useAuthContext();

  if (!authUser?.user) {
    toast.error("Access denied! Please log in first.");
    console.log("Redirecting to /login (No user found)");
    return <Navigate to="/login" replace />;
  }

  if (authUser.user.role !== "Admin") {
    toast.error("Unauthorized! Admin access only.");
    console.log("Redirecting to / (Not an Admin)");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
