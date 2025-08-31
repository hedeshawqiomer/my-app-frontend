// src/pages/admin/ProtectedRoute.jsx  ✅ KEEP THIS ONE
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allow = ["super", "moderator"] }) {
  const { user, booted, hasRole } = useAuth();
  const location = useLocation();

  if (!booted) return null; // or a spinner

  if (!user) {
    // remember where we wanted to go
    return <Navigate to="/admin/login" replace state={{ next: location.pathname }} />;
  }

  if (!hasRole(allow)) {
    const safe = user.role === "super" ? "/admin/accepted" : "/admin/pending";
    if (location.pathname !== safe) return <Navigate to={safe} replace />;
    return <Outlet />;
  }

  return <Outlet />;
}
