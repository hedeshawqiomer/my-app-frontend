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
// scroll to hash when it changes (once per hash change)
useEffect(() => {
  if (!location.hash) return;
  const id = location.hash.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}, [location.hash]);

// OPTIONAL: if you want the very first load (no hash) to start at top ONCE:
useEffect(() => {
  if (!location.hash) window.scrollTo({ top: 0, behavior: "auto" });
  // run only on first mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// Preserve scroll position across Bootstrap modal open/close
useEffect(() => {
  let lastY = 0;
  const onShow = () => { lastY = window.scrollY; };
  const onHidden = () => { window.scrollTo(0, lastY); };

  document.addEventListener("show.bs.modal", onShow);
  document.addEventListener("hidden.bs.modal", onHidden);
  return () => {
    document.removeEventListener("show.bs.modal", onShow);
    document.removeEventListener("hidden.bs.modal", onHidden);
  };
}, []);


  const cities = ["Erbil", "Sulaimani", "Duhok", "Halabja"];

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
