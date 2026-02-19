import React from "react";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import Header from "./PublicpagesComponents/HomepageComponents/Header";
import MoreAbout from "./PublicpagesComponents/HomepageComponents/MoreAbout";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import Recentcard from "./PublicpagesComponents/HomepageComponents/Recentcard";
import { useHomeAnimations } from "../hooks/useHomeAnimations";
import SEO from "../components/SEO";
import "../assets/custom_css.css";

function HomePage() {
  // Use custom hook for all animation logic
  useHomeAnimations();

  return (
    <>
      <SEO
        title="EKurdistan - Discover Attractive Resorts"
        description="Find and share the best picnic spots, resorts, and hidden gems in Kurdistan. Plan your perfect vacation with our curated list of destinations."
        type="website"
        name="EKurdistan Team"
      />

      <Navbar />

      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <MoreAbout />

      {/* Recent Cards Section */}
      <Recentcard />

      {/* Footer */}
      <Footer />

      {/* Offcanvas Panel */}
      <Offcanvas />
    </>
  );
}

export default HomePage;
