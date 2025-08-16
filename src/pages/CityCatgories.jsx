// src/components/CityCategories.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
// CityCategories.jsx
import { getAcceptedPosts } from "../utills/postStore";
import CitySection from "./PublicpagesComponents/ExplorepageComponents/CitySection"
import "../assets/custom_css2.css" // one reusable component

function CityCategories() {
    const location = useLocation();

  // 👇 Scroll to anchor on mount & when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // if no hash, start at top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.hash]);

  // 👇 Your existing effect (trimmed to what City page needs)
  useEffect(() => {
    // Animate cards when visible
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = [...document.querySelectorAll('.custom-card')].indexOf(card);
          card.style.setProperty('--delay', `${index * 0.2}s`);
          card.classList.add('visible');
          cardObserver.unobserve(card);
        }
      });
    });
    document.querySelectorAll('.custom-card').forEach(card => cardObserver.observe(card));

    // Animate .secondsec section
    const secondSecObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          secondSecObserver.unobserve(entry.target);
        }
      });
    });
    const section2 = document.querySelector('.secondsec');
    if (section2) secondSecObserver.observe(section2);

    // Navbar shrink on scroll
    const navbarShrink = () => {
      const navbar = document.getElementById('mainNav');
      if (!navbar) return;
      if (window.scrollY === 0) {
        navbar.classList.remove('navbar-shrink');
      } else {
        navbar.classList.add('navbar-shrink');
      }
    };
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Bootstrap ScrollSpy
    const mainNav = document.getElementById('mainNav');
    if (mainNav && window.bootstrap) {
      new window.bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -40%',
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener('scroll', navbarShrink);
      // no destroy needed for IntersectionObserver since we unobserve on intersect
      // ScrollSpy instance will be GC'd when page unmounts
    };
  }, []);




  const acceptedPosts = getAcceptedPosts();
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
