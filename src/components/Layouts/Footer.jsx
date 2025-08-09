import React from "react";

function Footer(){
      return (
            
            <footer className="py-3 my-4">
  <ul className="nav justify-content-center border-bottom pb-3 mb-3">
    <li className="nav-item">
      <a href="#" className="nn nav-link px-2 text-body-secondary">Home</a>
    </li>
    <li className="nav-item">
      <a href="#" className="nn nav-link px-2 text-body-secondary">About</a>
    </li>
    <li className="nav-item">
      <a href="#" className="nn nav-link px-2 text-body-secondary">Explore</a>
    </li>
  </ul>

  <p className="text-center text-body-secondary text-bold mb-0">
    © 2025 EKurdistan | Developed by
  </p>

  <p className="text-center mt-1">
    <a 
      href="mailto:realhede7@gmail.com" 
      className="text-decoration-none d-inline-flex align-items-center justify-content-center"
    >
      <span className="text-primary me-2">Muhammed Ali</span>

    </a>
  </p>
</footer>

            
      )
}
export default Footer;