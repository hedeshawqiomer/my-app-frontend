// src/pages/admin/DashboardComponents/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../PublicpagesComponents/Navbar";
import BackendFooter from "./BackendFooter.jsx";

export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar adminMode />
      <div className="container-fluid px-3 px-md-4 flex-grow-1">
        <Outlet />
      </div>
      <BackendFooter />
    </div>
  );
}
