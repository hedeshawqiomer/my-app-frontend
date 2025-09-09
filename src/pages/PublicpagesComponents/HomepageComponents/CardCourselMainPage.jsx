// src/components/PublicpagesComponents/HomepageComponents/CardCourselMainPage.jsx
import React, { useEffect, useState } from "react";
import { listPublicPosts } from "../../../api/public";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

// allow only http/https
function safeHttpUrl(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const url = new URL(u, window.location.origin);
    return (url.protocol === "http:" || url.protocol === "https:") ? url.href : "";
  } catch {
    return "";
  }
}

// make a safe id fragment from city (fallback if city has spaces/arabic etc.)
function idify(s) {
  return String(s || "city")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CardCourselMainPage({ city = "Erbil" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listPublicPosts();
        const byCity = (data || []).filter((p) => p.city === city);
        const first = byCity[0];

        const imgs = (first?.images || []).map((img) =>
          safeHttpUrl(typeof img === "string" ? img : toAbs(img?.url))
        );
        setImages(imgs);
      } catch (e) {
        console.error("Failed to load images:", e);
        setImages([]);
      }
    })();
  }, [city]);

  // derive unique IDs per city
  const cid = idify(city);
  const modalId = `carouselModal-${cid}`;
  const carouselId = `carousel-${cid}`;

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}-label`}>{city} - Gallery</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {images.map((_, i) => (
                  <button
                    key={`ind-${cid}-${i}`}
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    aria-current={i === 0 ? "true" : undefined}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="carousel-inner">
                {images.length === 0 ? (
                  <div className="carousel-item active">
                    <img
                      src="/pictures/placeholder.jpg"
                      className="d-block w-100"
                      alt="No images"
                      loading="lazy"
                      width="1200"
                      height="800"
                    />
                  </div>
                ) : (
                  images.map((src, i) => (
                    <div key={`slide-${cid}-${i}`} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                      <img
                        src={src || "/pictures/placeholder.jpg"}
                        className="d-block w-100"
                        alt={`Slide ${i + 1}`}
                        loading="lazy"
                        width="1200"
                        height="800"
                      />
                    </div>
                  ))
                )}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default CardCourselMainPage;
