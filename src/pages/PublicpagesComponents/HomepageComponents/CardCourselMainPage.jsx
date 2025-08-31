// src/components/PublicpagesComponents/HomepageComponents/CardCourselMainPage.jsx
import React, { useEffect, useState } from "react";
import { listPublicPosts } from "../../../api/public"; // GET /posts/public

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

function CardCourselMainPage({ city = "Erbil" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // load public/accepted posts and pick the first one for this city
        const data = await listPublicPosts();
        const byCity = (data || []).filter((p) => p.city === city);
        const first = byCity[0];

        const imgs = (first?.images || []).map((img) =>
          typeof img === "string" ? img : toAbs(img?.url)
        );
        setImages(imgs);
      } catch (e) {
        console.error("Failed to load images:", e);
        setImages([]);
      }
    })();
  }, [city]);

  return (
    <div
      className="modal fade"
      id="carouselModal1"
      tabIndex="-1"
      aria-labelledby="carouselModalLabel1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="carouselModalLabel1">{city} - Gallery</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div id="carouselExampleIndicators1" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target="#carouselExampleIndicators1"
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
                    />
                  </div>
                ) : (
                  images.map((src, i) => (
                    <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                      <img src={src} className="d-block w-100" alt={`Slide ${i + 1}`} />
                    </div>
                  ))
                )}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators1"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators1"
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
