import React from "react";
import { useNavigate } from "react-router-dom";
// Optional ESM fallback if you ever switch from bundle to module:
// import { Offcanvas } from "bootstrap";

function Offcanvas() {
  const navigate = useNavigate();

  const goCity = (city) => (e) => {
    e.preventDefault();
    navigate(`/city-categories#${encodeURIComponent(city)}`);

    // Close the offcanvas
    const el = document.getElementById("offcanvasRight");
    if (!el) return;

    // Prefer window.bootstrap if you include bootstrap.bundle.min.js
    if (window.bootstrap?.Offcanvas) {
      const inst = window.bootstrap.Offcanvas.getOrCreateInstance(el);
      inst?.hide();
    }
    // Optional fallback if you import ESM instead:
    // else if (Offcanvas) {
    //   const inst = Offcanvas.getOrCreateInstance(el);
    //   inst?.hide();
    // }
  };

  return (
    <div
      className="offcanvas offcanvas-end text-black"
      style={{ backgroundColor: "#cff1b7" }}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel" className="mb-0">
          City Category
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <div className="d-grid gap-2">
          <a
            href="/city-categories#Erbil"
            className="btn gradient-btn text-dark"
            onClick={goCity("Erbil")}
            data-bs-dismiss="offcanvas"
          >
            Erbil
          </a>

          <a
            href="/city-categories#Sulaimani"
            className="btn gradient-btn text-dark"
            onClick={goCity("Sulaimani")}
            data-bs-dismiss="offcanvas"
          >
            Sulaimani
          </a>

          <a
            href="/city-categories#Duhok"
            className="btn gradient-btn text-dark"
            onClick={goCity("Duhok")}
            data-bs-dismiss="offcanvas"
          >
            Duhok
          </a>

          <a
            href="/city-categories#Halabja"
            className="btn gradient-btn text-dark"
            onClick={goCity("Halabja")}
            data-bs-dismiss="offcanvas"
          >
            Halabja
          </a>
        </div>
      </div>
    </div>
  );
}

export default Offcanvas;
