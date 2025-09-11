// Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
//import { useNavigate } from "react-router-dom";

// ...

export default function Navbar({ adminMode = false }) {
  //const navigate = useNavigate();
  const { user, logout } = useAuth();
  const authed = !!user;
  const role = user?.role;

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
          🌍 EKurdistan
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
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#!"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                  >
                    Explore
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-post">
                    Share Destination
                  </Link>
                </li>
              </>
            )}

            {adminMode && authed && (
              <>
                <li className="nav-item">
                  <NavLink to="/admin/pending" className="nav-link">
                    Pending
                  </NavLink>
                </li>
                {role === "super" && (
                  <li className="nav-item">
                    <NavLink to="/admin/accepted" className="nav-link">
                      Accepted
                    </NavLink>
                  </li>
                )}
              </>
            )}

            {!authed && adminMode && (
              <li className="nav-item">
                <NavLink to="/admin/login" className="nav-link">
                  Admin Login
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
      window.location.replace("/");
      // (using replace instead of navigate prevents the double-back issue)
    }
  }}
>
  Logout
</button>


              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
