// src/pages/admin/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sanitizeNextPath } from "../../utills/nav";

const toRoleSet = (arr) =>
  new Set((arr || []).map((r) => String(r || "").toLowerCase()));

export default function ProtectedRoute({ allow = ["super", "moderator"] }) {
  const { user, booted, hasRole } = useAuth();
  const location = useLocation();
  const allowed = toRoleSet(allow);
  const userRole = String(user?.role || "").toLowerCase();

  // Block rendering entirely until auth has booted to avoid “flash”.
  if (!booted) {
    return (
      <div className="text-center py-5" role="status" aria-live="polite">
        Checking access…
      </div>
    );
  }

  // Not logged in → go to login, remember where we wanted to go
  if (!user) {
    const next = sanitizeNextPath(location.pathname + location.search);
    return <Navigate to="/admin/login" replace state={{ next }} />;
  }

  // Role check (support both hasRole helper and local set)
  const ok = hasRole ? hasRole(allow) : allowed.has(userRole);

  // If logged in but not allowed: send them to a safe tab for their role
  if (!ok) {
    const safe = userRole === "super" ? "/admin/accepted" : "/admin/pending";
    if (location.pathname !== safe) return <Navigate to={safe} replace />;
    return <Outlet />;
  }

  return <Outlet />;
}
