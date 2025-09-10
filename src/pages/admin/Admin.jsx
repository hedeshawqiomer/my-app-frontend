import React from "react";
import BackendNavbar from "../PublicpagesComponents/Navbar";
import BackendHeader from "./DashboardComponents/BackendHeader";
import Pendingposts from "./Pendingposts";
import BackendFooter from "./DashboardComponents/BackendFooter";
import "../assets/custom_css4.css"; // fixed path

function Admin() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Enable admin mode so admin tabs show */}
      <BackendNavbar adminMode />
      <div className="container-fluid px-3 px-md-4 flex-grow-1">
        <BackendHeader />
        <Pendingposts />
      </div>
      <BackendFooter />
    </div>
  );
}

export default Admin;
