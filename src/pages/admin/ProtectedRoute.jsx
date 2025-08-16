// src/pages/admin/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allow = ["super", "moderator"] }) {
  const { user, booted, hasRole } = useAuth();
  const location = useLocation();

  // Wait for auth init to avoid mis-redirects during first paint
  if (!booted) return null; // or a spinner

  // Decide a target (if any), but DO NOT redirect to the same path
  let target = null;
  if (!user) {
    // send to login, remember intended URL
    target = "/admin/login";
    if (location.pathname === target) return <Outlet />; // already at login → don't loop
    return <Navigate to={target} replace state={{ next: location.pathname }} />;
  }

  if (!hasRole(allow)) {
    // pick a safe landing this role CAN access
    target = user.role === "super" ? "/admin/accepted" : "/admin/pending";
    if (location.pathname !== target) {
      return <Navigate to={target} replace />;
    }
    // already on target → render to avoid loop
    return <Outlet />;
  }

  // Allowed → render nested children
  return <Outlet />;
}
