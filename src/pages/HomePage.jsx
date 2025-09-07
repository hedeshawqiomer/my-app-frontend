import React,{ useEffect } from "react";
import Navbar  from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer"
import Header  from "./PublicpagesComponents/HomepageComponents/Header";
import MoreAbout  from "./PublicpagesComponents/HomepageComponents/MoreAbout";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import Recentcard from "./PublicpagesComponents/HomepageComponents/Recentcard";
import '../assets/custom_css.css';
 // path correct and file exists
function HomePage() {
useEffect(() => {
  // Card reveal
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = [...document.querySelectorAll(".custom-card")].indexOf(card);
        card.style.setProperty("--delay", `${index * 0.2}s`);
        card.classList.add("visible");
        cardObserver.unobserve(card);
      }
    });
  });
  document.querySelectorAll(".custom-card").forEach((card) => cardObserver.observe(card));

  // Section 2 reveal
  const secondSecObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        secondSecObserver.unobserve(entry.target);
      }
    });
  });
  const section2 = document.querySelector(".secondsec");
  if (section2) secondSecObserver.observe(section2);

  // Hero observer (hoisted so we can clean up)
  let heroObserver = null;
  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    const targets = heroSection.querySelectorAll(".slide-down, .fade-down");
    heroObserver = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        targets.forEach((el) => el.classList.add("visible"));
        obs.unobserve(entry.target); // run once
      }
    }, { threshold: 0.4 });
    heroObserver.observe(heroSection);
  }

  // Navbar shrink
  const navbarShrink = () => {
    const navbar = document.getElementById("mainNav");
    if (!navbar) return;
    if (window.scrollY === 0) navbar.classList.remove("navbar-shrink");
    else navbar.classList.add("navbar-shrink");
  };
  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  // ScrollSpy
  const mainNav = document.getElementById("mainNav");
  if (mainNav && window.bootstrap) {
    new window.bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse navbar on link click
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navLinks = document.querySelectorAll("#navbarResponsive .nav-link");
  const onLinkClick = () => {
    if (navbarToggler && window.getComputedStyle(navbarToggler).display !== "none") {
      navbarToggler.click();
    }
  };
  navLinks.forEach((link) => link.addEventListener("click", onLinkClick));

  // Optional plugins
  const portfolioEls = document.querySelectorAll("#portfolio a.portfolio-box");
  if (portfolioEls.length > 0 && window.SimpleLightbox) {
    new window.SimpleLightbox("#portfolio a.portfolio-box");
  }
  if (window.AOS) {
    window.AOS.init({ duration: 1000, once: true });
  }

  // Cleanup
  return () => {
    document.removeEventListener("scroll", navbarShrink);
    navLinks.forEach((link) => link.removeEventListener("click", onLinkClick));
    try { cardObserver.disconnect(); } catch {
      // ignore
    }
    try { secondSecObserver.disconnect(); } catch {
      // ignore
    }
    try { heroObserver && heroObserver.disconnect(); } catch {
      // ignore
    }
  };
}, []);



  return (
    <>
  <Navbar />

      {/* 🔽 Paste here */}
      
      {/* Header Section */}
<Header />


      {/* Hero Section */}

<MoreAbout />



<Recentcard/>




      {/* Scroll Section */}

{/* Footer */}
<Footer />

{/* Offcanvas Panel */}

<Offcanvas />
    </>
  );
}

export default HomePage;



