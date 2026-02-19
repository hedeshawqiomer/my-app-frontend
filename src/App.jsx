import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HomePage from "./pages/HomePage";
import CityCategories from "./pages/CityCatgories";
import UserPost from "./pages/UserPost";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import SubmittedPosts from "./pages/SubmittedPosts";

// Lazy admin screens
const AdminLayout = lazy(
  () => import("./pages/admin/DashboardComponents/AdminLayout.jsx"),
);
const Pendingposts = lazy(() => import("./pages/admin/Pendingposts.jsx"));
const AcceptedPosts = lazy(() => import("./pages/admin/AllpostsDashboard.jsx"));

const Loader = () => <div className="text-center py-5">Loading…</div>;

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ku" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/city-categories" element={<CityCategories />} />
      <Route path="/user-post" element={<UserPost />} />
      <Route path="/submitted-posts" element={<SubmittedPosts />} />

      {/* Auth (login page itself is public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin (guard only these) */}
      <Route
        path="/admin"
        element={<ProtectedRoute allow={["super", "moderator"]} />}
      >
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<Navigate to="pending" replace />} />
          <Route
            path="pending"
            element={
              <Suspense fallback={<Loader />}>
                <Pendingposts />
              </Suspense>
            }
          />
          {/* Only SUPER can see /accepted */}
          <Route element={<ProtectedRoute allow={["super"]} />}>
            <Route
              path="accepted"
              element={
                <Suspense fallback={<Loader />}>
                  <AcceptedPosts />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
