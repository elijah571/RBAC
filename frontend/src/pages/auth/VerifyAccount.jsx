import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useVerifyAccount from "../../hooks/useVerifyAcount";

const VerifyAccount = () => {
  const { loading, verifyAccount } = useVerifyAccount();
  const navigate = useNavigate(); // Initialize navigation
  const [verificationToken, setVerificationToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await verifyAccount(verificationToken);
    if (response) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Verification Token"
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 text-center tracking-widest"
            maxLength={6} 
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
