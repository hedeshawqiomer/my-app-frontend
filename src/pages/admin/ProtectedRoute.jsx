// src/pages/admin/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sanitizeNextPath } from "../../utils/nav";

const toRoleSet = (arr) => new Set((arr || []).map(r => String(r || "").toLowerCase()));

export default function ProtectedRoute({ allow = ["super", "moderator"] }) {
  const { user, booted, hasRole } = useAuth();
  const location = useLocation();
  const allowed = toRoleSet(allow);
  const userRole = String(user?.role || "").toLowerCase();

  if (!booted) {
    return <div className="text-center py-5">Loading…</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ next: sanitizeNextPath(location.pathname) }}
      />
    );
  }

  const ok = hasRole ? hasRole(allow) : allowed.has(userRole);

  if (!ok) {
    const safe = userRole === "super" ? "/admin/accepted" : "/admin/pending";
    if (location.pathname !== safe) return <Navigate to={safe} replace />;
    return <Outlet />;
  }

  return <Outlet />;
}
