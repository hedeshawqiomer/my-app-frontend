// src/pages/CityCategories.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import CitySection from "./PublicpagesComponents/ExplorepageComponents/CitySection";
import { listPublicPosts } from "../api/public";
import "../assets/custom_css2.css";

const CITIES = ["Erbil", "Sulaimani", "Duhok", "Halabja"]; // <- canonical

export default function CityCategories() {
  const location = useLocation();
  const [acceptedPosts, setAcceptedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accepted posts from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await listPublicPosts();
        setAcceptedPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load public posts", e);
        setAcceptedPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Smooth scroll to the hash (only for known city IDs)
  useEffect(() => {
    const raw = location.hash?.slice(1) || "";
    const id = decodeURIComponent(raw);
    if (id && CITIES.includes(id)) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <main className="container py-4">
        {loading ? (
          <div className="text-center py-5" role="status" aria-live="polite">
            Loading cities…
          </div>
        ) : (
          CITIES.map((city) => (
            <CitySection
              key={city}
              city={city}
              posts={acceptedPosts.filter((p) => p.city === city)}
            />
          ))
        )}
      </main>
      <Footer />
      <Offcanvas />
    </>
  );
}
