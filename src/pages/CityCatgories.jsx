// src/pages/CityCatgories.jsx  (your file name)
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import CitySection from "./PublicpagesComponents/ExplorepageComponents/CitySection";
import { listPublicPosts } from "../api/public";
import "../assets/custom_css2.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function CityCategories() {
  const location = useLocation();
  const [acceptedPosts, setAcceptedPosts] = useState([]);

  // fetch accepted posts from backend
  useEffect(() => {
    (async () => {
      const data = await listPublicPosts();
      setAcceptedPosts(data || []);
    })();
  }, []);

  // scroll to hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.hash]);

  const cities = ["Erbil", "Sulaimani", "Duhok", "Halabja", "Kirkuk"];

  return (
    <>
      <Navbar />
      {cities.map(city => (
        <CitySection
          key={city}
          city={city}
          posts={acceptedPosts.filter(p => p.city === city)}
        />
      ))}
      <Footer />
      <Offcanvas />
    </>
  );
}
export default CityCategories;
