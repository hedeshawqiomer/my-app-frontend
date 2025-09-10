// src/components/PublicpagesComponents/ExplorepageComponents/CardCoursel.jsx
import React from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

export default function CardCoursel({ post }) {
  const modalId = `modal-${post.id}`;
  const carouselId = `carousel-${post.id}`;
  const images = (post.images && post.images.length ? post.images : ["/pictures/placeholder.jpg"]);

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">{/* stock classes only */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}-label`}>{post.city} — Gallery</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>

          <div className="modal-body">
            <div id={carouselId} className="carousel slide" data-bs-ride="false">
              {/* indicators */}
              <div className="carousel-indicators">
                {images.map((_, i) => (
                  <button
                    key={`ind-${post.id}-${i}`}
                    type="button"
                    data-bs-target={`#${carouselId}`}
                    data-bs-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    aria-current={i === 0 ? "true" : undefined}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* slides */}
              <div className="carousel-inner">
                {images.map((img, i) => {
                  const src = typeof img === "string" ? img : toAbs(img?.url);
                  return (
                    <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={`${post.id}-${i}`}>
                      <img src={src || "/pictures/placeholder.jpg"} className="d-block w-100" alt={`Slide ${i + 1}`} />
                    </div>
                  );
                })}
              </div>

              {/* controls */}
              <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
