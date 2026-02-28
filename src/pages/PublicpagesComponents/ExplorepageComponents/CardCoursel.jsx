// src/components/PublicpagesComponents/ExplorepageComponents/CardCoursel.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

export default function CardCoursel({ post }) {
  const { t } = useTranslation();
  const modalId = `modal-${post.id}`;
  const carouselId = `carousel-${post.id}`;
  const images = (post.images && post.images.length ? post.images : ["/pictures/placeholder.png"]);

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">{/* stock classes only */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}-label`}>
              {post.city ? t(`offcanvas.categories.${post.city}`, post.city) : ""}
              {post.district ? ` - ${t(`districts.${post.district}`, post.district)}` : ""}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>

          <div className="modal-body">
            <div id={carouselId} className="carousel slide" data-bs-ride="false">
              {/* indicators */}
        
                
           

              {/* slides */}
              <div className="carousel-inner">
                {images.map((img, i) => {
                  const src = typeof img === "string" ? img : toAbs(img?.url);
                  return (
                    <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={`${post.id}-${i}`}>
                      <img src={src || "/pictures/placeholder.png"} className="d-block w-100" alt={`Slide ${i + 1}`} />
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
