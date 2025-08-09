import React, { useEffect } from "react";
import GLightbox from "glightbox";
import BackendNavbar from "./Layouts/BackendNavbar";
import BackendHeader from "./Layouts/BackendHeader";
import Pendingposts from "./Layouts/Pendingposts";
import BackendFooter from "./Layouts/BackendFooter"; // new shared footer
import "../assets/custom_css4.css";
import "glightbox/dist/css/glightbox.min.css";

function Admin() {
  useEffect(() => {
    const lightbox = GLightbox({ selector: ".glightbox" });
    return () => lightbox.destroy();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BackendNavbar />
      <div className="container-fluid px-3 px-md-4 flex-grow-1">
        <BackendHeader />
        <Pendingposts />
      </div>
      <BackendFooter />
    </div>
  );
}

export default Admin;
