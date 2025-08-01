import React, { useEffect } from "react";
import Footer from "./Layouts/Footer";
import GLightbox from "glightbox";
import BackendNavbar from "./Layouts/BackendNavbar";
import BackendHeader from "./Layouts/BackendHeader";
import Pendingposts from "./Layouts/Pendingposts";
import "../assets/custom_css4.css";
import "glightbox/dist/css/glightbox.min.css"; // Don't forget this

function Admin() {
  useEffect(() => {
    const lightbox = GLightbox({ selector: ".glightbox" });

    const cityFilter = document.getElementById("cityFilter");
    const handleFilterChange = () => {
      const selectedCity = cityFilter.value.toLowerCase();
      const rows = document.querySelectorAll("#submissionTable tr");
      rows.forEach((row) => {
        const city = row.children[5].textContent.toLowerCase();
        row.style.display = selectedCity === "" || city === selectedCity ? "" : "none";
      });
    };

    if (cityFilter) {
      cityFilter.addEventListener("change", handleFilterChange);
    }

    return () => {
      if (cityFilter) {
        cityFilter.removeEventListener("change", handleFilterChange);
      }
      lightbox.destroy();
    };
  }, []);

  return (
    <>
      <BackendNavbar />
      <BackendHeader />
      <Pendingposts />
      <Footer />
    </>
  );
}

export default Admin;
