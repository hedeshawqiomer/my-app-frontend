import { useEffect } from "react";

export function useHomeAnimations() {
  useEffect(() => {
    // 1. Card reveal observer
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const allCards = [...document.querySelectorAll(".custom-card")];
          const index = allCards.indexOf(card);
          // Stagger delay based on index
          card.style.setProperty("--delay", `${index * 0.2}s`);
          card.classList.add("visible");
          cardObserver.unobserve(card);
        }
      });
    });
    document.querySelectorAll(".custom-card").forEach((c) => cardObserver.observe(c));

    // 2. Section 2 reveal observer
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

    // 3. Hero observer (slide-down / fade-down elements)
    let heroObserver = null;
    const heroSection = document.getElementById("heroSection");
    if (heroSection) {
      const targets = heroSection.querySelectorAll(".slide-down, .fade-down");
      heroObserver = new IntersectionObserver(
        ([entry], obs) => {
          if (entry.isIntersecting) {
            targets.forEach((el) => el.classList.add("visible"));
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.4 }
      );
      heroObserver.observe(heroSection);
    }

    // 4. Navbar shrink on scroll
    const navbarShrink = () => {
      const navbar = document.getElementById("mainNav");
      if (!navbar) return;
      if (window.scrollY === 0) navbar.classList.remove("navbar-shrink");
      else navbar.classList.add("navbar-shrink");
    };
    navbarShrink();
    document.addEventListener("scroll", navbarShrink);

    // 5. ScrollSpy (Bootstrap)
    const mainNav = document.getElementById("mainNav");
    if (mainNav && window.bootstrap) {
      new window.bootstrap.ScrollSpy(document.body, {
        target: "#mainNav",
        rootMargin: "0px 0px -40%",
      });
    }

    // 6. Collapse navbar on link click (mobile)
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navLinks = document.querySelectorAll("#navbarResponsive .nav-link");
    const onLinkClick = () => {
      if (
        navbarToggler &&
        window.getComputedStyle(navbarToggler).display !== "none"
      ) {
        navbarToggler.click();
      }
    };
    navLinks.forEach((link) => link.addEventListener("click", onLinkClick));

    // 7. Initialize AOS if available
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }

    // Cleanup function
    return () => {
      document.removeEventListener("scroll", navbarShrink);
      navLinks.forEach((link) => link.removeEventListener("click", onLinkClick));
      try { cardObserver.disconnect(); } catch {}
      try { secondSecObserver.disconnect(); } catch {}
      try { heroObserver && heroObserver.disconnect(); } catch {}
    };
  }, []);
}
