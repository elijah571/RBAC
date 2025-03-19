import { useState } from "react";
import { useParams } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const { loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken || !newPassword) return;
    
    const response = await resetPassword({ resetToken, newPassword });

    if (response.success) {
      alert("Password reset successful! You can now log in.");
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow-md rounded">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
