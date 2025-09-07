// src/components/PublicpagesComponents/ExplorepageComponents/CardCoursel.jsx
import React from "react";
import "../../../assets/custom_css2.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

function safeHttpUrl(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const url = new URL(u, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

export default function CardCoursel({ post }) {
  const pid = post._pid ?? post.id; // stable id passed in

  return (
    <div className="modal fade" id={`carouselModal-${pid}`} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered custom-carousel-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.city}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div className="modal-body">
            <div id={`carousel-${pid}`} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {(post.images || []).map((img, i) => {
                  const src =
                    safeHttpUrl(typeof img === "string" ? img : img?.url) ||
                    toAbs(img?.url) ||
                    "/pictures/placeholder.jpg";
                  return (
                    <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={img?.id ?? `${pid}-${i}`}>
                      <img
                        src={src}
                        className="d-block w-100 carousel-img"
                        alt={`Slide ${i + 1}`}
                        loading="lazy"
                        width="1600"
                        height="900"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${pid}`}
                data-bs-slide="prev"
                aria-label="Previous image"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${pid}`}
                data-bs-slide="next"
                aria-label="Next image"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
