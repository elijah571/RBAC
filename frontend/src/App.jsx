import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import VerifyAccount from './pages/auth/VerifyAccount';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminDashboard from './pages/dashboard/AdminDashboard';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} /> 
        <Route element={<ProtectedAdminRoute/>}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
