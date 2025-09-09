import React from "react";
import { useNavigate } from "react-router-dom";

function Offcanvas() {
  const navigate = useNavigate();

  const goCity = (city) => (e) => {
    e.preventDefault();
    // navigate to hash (must match CitySection id exactly)
    navigate(`/city-categories#${encodeURIComponent(city)}`);
    // close the offcanvas (works whether you used data attributes or API)
    const el = document.getElementById("offcanvasRight");
    if (window.bootstrap && el) {
      const inst = window.bootstrap.Offcanvas.getOrCreateInstance(el);
      inst?.hide();
    }
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
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body">
        <h5 className="mb-3 text-dark fw-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ms-2 me-2"
            width="20"
            height="27"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
          </svg>
          City Category :
        </h5>

        <div className="d-grid gap-2">
          {/* IMPORTANT: these city names must match the <section id="..."> exactly */}
          <a
            href="/city-categories#Erbil"
            className="btn gradient-btn text-dark"
            onClick={goCity("Erbil")}
            data-bs-dismiss="offcanvas"
          >
            Erbil
          </a>

          <a
            href="/city-categories#Sulaimani"  // <- not "Slemani"
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
