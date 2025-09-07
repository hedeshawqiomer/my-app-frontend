// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";
import CityCategories from "./pages/CityCatgories";
import UserPost from "./pages/UserPost";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import SubmittedPosts from "./pages/SubmittedPosts";
import Forbidden from "./pages/admin/Forrebiden";
const AdminLayout   = lazy(() => import("./pages/admin/DashboardComponents/AdminLayout.jsx"));
const Pendingposts  = lazy(() => import("./pages/admin/Pendingposts.jsx"));
const AcceptedPosts = lazy(() => import("./pages/admin/AllpostsDashboard.jsx"));

const Loader = () => <div className="text-center py-5">Loading…</div>;

export default function App() {
  return (
    <Routes>

      
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/city-categories" element={<CityCategories />} />
      <Route path="/user-post" element={<UserPost />} />
      <Route path="/submitted-posts" element={<SubmittedPosts />} />

      {/* Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      // in App.jsx
<Route path="/403" element={<Forbidden />} />

      {/* Admin (guard ONCE here) */}
   <Route path="/admin" element={<ProtectedRoute allow={["super","moderator"]} />}>
  <Route element={<Suspense fallback={<Loader />}><AdminLayout /></Suspense>}>
    <Route index element={<Navigate to="pending" replace />} />
    <Route path="pending" element={<Suspense><Pendingposts /></Suspense>} />
    <Route element={<ProtectedRoute allow={["super"]} />}>
      <Route path="accepted" element={<Suspense><AcceptedPosts /></Suspense>} />
    </Route>
  </Route>
</Route>


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
