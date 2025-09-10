// src/pages/admin/DashboardComponents/AdminLayout.jsx
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../PublicpagesComponents/Navbar";
import BackendFooter from "./BackendFooter.jsx";

// Minimal class-based error boundary (React 16+)
class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Log if you want (safely, without leaking to users)
    console.error("Admin route crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-4">
          <div className="alert alert-danger">
            <strong>Something went wrong.</strong> Try reloading the page.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Fixed-top admin navbar */}
      <Navbar adminMode />

      {/* Add top padding so content isn't hidden under the fixed navbar */}
      <main
        id="admin-main"
        role="main"
        className="container-fluid px-3 px-md-4 flex-grow-1"
        style={{ paddingTop: "4.5rem" }} // ~navbar height
      >
        <AdminErrorBoundary>
          <Suspense fallback={<div className="text-center py-5">Loading…</div>}>
            <Outlet />
          </Suspense>
        </AdminErrorBoundary>
      </main>

      <BackendFooter />
    </div>
  );
}
