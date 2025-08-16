import React from "react";
import "../../../assets/custom_css2.css"
// CardCoursel.jsx
function CardCoursel({ post }) {
  return (
    <div
      className="modal fade"
      id={`carouselModal-${post.id}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered custom-carousel-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{post.city}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div id={`carousel-${post.id}`} className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {post.images.map((img, i) => (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img src={img} className="d-block w-100 carousel-img " alt={`Slide ${i}`} />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${post.id}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${post.id}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  CardCoursel;