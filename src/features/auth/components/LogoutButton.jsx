import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <button
      onClick={async () => {
        await logout();
        navigate("/login", { replace: true });
      }}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: 8,
        padding: "10px 18px",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
