// Navbar.jsx
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import FlagIcon from "../../components/FlagIcon";
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
           <span className="earth-icon">🌍</span> {t('navbar.brand')}
        </Link>

        {/* Right Side: Language Switcher and Hamburger */}
        <div className="d-flex align-items-center gap-2">
          {/* Language Switcher - ALWAYS VISIBLE */}
          <div className="dropdown">
            <a
              className="nav-link d-flex align-items-center px-2 py-0"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FlagIcon country={i18n.language} width={30} height={22} className="shadow-sm rounded-1" />
            </a>
            <ul className="dropdown-menu lang-dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3 p-2 position-absolute" aria-labelledby="navbarDropdown">
              <li>
                <button 
                  className={`dropdown-item lang-dropdown-item d-flex align-items-center gap-3 p-2 rounded-2 mb-1 ${i18n.language === 'en' ? 'active bg-light' : ''}`} 
                  onClick={() => changeLanguage("en")}
                >
                  <FlagIcon country="en" width={24} height={18} className="shadow-sm rounded-1" />
                  <span className="fw-semibold">English</span>
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item lang-dropdown-item d-flex align-items-center gap-3 p-2 rounded-2 ${i18n.language === 'ku' ? 'active bg-light' : ''}`} 
                  onClick={() => changeLanguage("ku")}
                >
                  <FlagIcon country="ku" width={24} height={18} className="shadow-sm rounded-1" />
                  <span className="fw-semibold">Kurdish</span>
                </button>
              </li>
            </ul>
          </div>

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
        </div>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto my-2 my-lg-0 align-items-center gap-3">
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

          </ul>
        </div>
      </div>
    </nav>
  );
}
