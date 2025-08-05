import React,{ useEffect } from "react";
import Navbar  from "./Layouts/Navbar";
import Footer from "./Layouts/Footer"
import Header  from "./Layouts/Header";
import MoreAbout  from "./Layouts/MoreAbout";
import Offcanvas from "./Layouts/Offcanvas";
import Recentcard from "./Layouts/Recentcard";
import '../assets/custom_css.css';
 // path correct and file exists
function HomePage() {
useEffect(() => {
  // 🔷 Animate cards when visible
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

  document.querySelectorAll('.custom-card').forEach(card => {
    cardObserver.observe(card);
  });

  // 🔷 Animate .secondsec section
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

  // 🔷 Animate hero section with .slide-down or .fade-down
  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    const targets = heroSection.querySelectorAll('.slide-down, .fade-down');

    const heroObserver = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        targets.forEach(el => el.classList.add('visible'));
        obs.unobserve(entry.target); // run once only
      }
    }, {
      threshold: 0.4
    });

    heroObserver.observe(heroSection);
  }

  // 🔷 Navbar shrink on scroll
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

  // 🔷 Bootstrap ScrollSpy (only if Bootstrap is globally loaded)
  const mainNav = document.getElementById('mainNav');
  if (mainNav && window.bootstrap) {
    new window.bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  // 🔷 Collapse navbar on link click (for mobile)
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

// 🔷 SimpleLightbox plugin for portfolio (if loaded)
const portfolioEls = document.querySelectorAll('#portfolio a.portfolio-box');
if (portfolioEls.length > 0 && window.SimpleLightbox) {
new window.SimpleLightbox('#portfolio a.portfolio-box');
}



  // 🔷 AOS animation init (if loaded)
  if (window.AOS) {
    window.AOS.init({
      duration: 1000,
      once: true,
    });
  }
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



