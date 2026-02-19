// Navbar.jsx
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Navbar({ adminMode = false }) {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const authed = !!user;
  const role = user?.role;

  // Handle RTL direction
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ku" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top pt-3 pb-1 ${
        adminMode ? "bg-white shadow-sm" : ""
      }`}
      id="mainNav"
    >
      <div className="container px-4 px-lg-5">
        {/* Brand */}
        <Link className="navbar-brand fs-3 mb-0" to="/">
          🌍 {t('navbar.brand')}
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
            {!adminMode && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    {t('navbar.about')}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#!"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                  >
                    {t('navbar.explore')}
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-post">
                     {t('navbar.share')}
                  </Link>
                </li>
              </>
            )}

            {adminMode && authed && (
              <>
                <li className="nav-item">
                  <NavLink to="/admin/pending" className="nav-link">
                    {t('navbar.pending')}
                  </NavLink>
                </li>
                {role === "super" && (
                  <li className="nav-item">
                    <NavLink to="/admin/accepted" className="nav-link">
                       {t('navbar.accepted')}
                    </NavLink>
                  </li>
                )}
              </>
            )}

            {!authed && adminMode && (
              <li className="nav-item">
                <NavLink to="/admin/login" className="nav-link">
                   {t('navbar.login')}
                </NavLink>
              </li>
            )}
            {authed && adminMode && (
              <li className="nav-item">
            

<button
  className="btn btn-sm btn-outline-secondary"
  onClick={async () => {
    try {
      await logout();                           // server logout + clear user in context
    } finally {
      // kill any stored next target so we never bounce to a protected page
      try { sessionStorage.removeItem("postLoginNext"); } catch {
        // ignore 
      }
      try { localStorage.removeItem("postLoginNext"); } catch {
        // ignore
      }

      // replace the current history entry so Back won’t go to a protected route
      // and land directly on the login page
     // (using replace instead of navigate prevents the double-back issue)
      window.location.replace("/");
   
    }
  }}
>
  {t('navbar.logout')}
</button>


              </li>
            )}
            {/* Language Switcher */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🌐 {i18n.language === "ku" ? "Kurdî" : "English"}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => changeLanguage("en")}>
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => changeLanguage("ku")}>
                    🇹🇯 Kurdî
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
