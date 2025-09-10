// src/pages/admin/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sanitizeNextPath } from "../../utills/nav";

const toSet = (v) =>
  new Set([].concat(v || []).map((r) => String(r || "").toLowerCase()));

export default function ProtectedRoute({ allow = ["super", "moderator"] }) {
  const { user, booted, hasRole } = useAuth();
  const location = useLocation();

  // Build the full requested path
  const requested =
    (location?.pathname || "/") +
    (location?.search || "") +
    (location?.hash || "");

  const allowed = toSet(allow);
  const userRole = String(user?.role || "").toLowerCase();

  // 1) Wait for auth boot to avoid any flash
  if (!booted) {
    return (
      <div className="text-center py-5" role="status" aria-live="polite">
        Checking access…
      </div>
    );
  }

  // 2) Not logged in -> only capture "next" if it’s an admin route
  if (!user) {
    const wantsAdmin = requested.startsWith("/admin");
    const next = wantsAdmin ? sanitizeNextPath(requested) : "";
    return <Navigate to="/admin/login" replace state={{ next }} />;
  }

  // 3) Role check
  const ok = hasRole ? hasRole(Array.from(allowed)) : allowed.has(userRole);

  // 4) If logged in but not allowed -> redirect to a safe tab for their role
  if (!ok) {
    const safe = userRole === "super" ? "/admin/accepted" : "/admin/pending";
    if (location.pathname !== safe) return <Navigate to={safe} replace />;
    return <Outlet />;
  }

  // 5) Allowed -> render nested route
  return <Outlet />;
}
