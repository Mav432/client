import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
//import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import ControlPage from "./pages/ControlPanel";
import Navbar from "./components/Navbar";

import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import SendRecoveryEmailPage from "./pages/SendRecoveryEmailPage";
import VerifyAnswerPage from "./pages/VerifyAnswerPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <div>
      <Navbar /> {/* Agrega el componente Navbar aquí */}
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/controlpanel" element={
          <ProtectedRoute>
            <ControlPage />
          </ProtectedRoute>
        } />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        <Route path="/send-recovery-email/:userId" element={<SendRecoveryEmailPage />} />
        <Route path="/verify-answer/:userId" element={<VerifyAnswerPage />} />
        <Route path="/reset-password/:userId" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
