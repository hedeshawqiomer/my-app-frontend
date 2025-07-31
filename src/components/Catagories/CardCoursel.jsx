import React from "react";

function CardCoursel(){
return (
<div
  className="modal fade"
  id="carouselModal1"
  tabIndex="-1"
  aria-labelledby="carouselModalLabel1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered custom-carousel-modal">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Erbil</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div className="modal-body">
        <div
          id="carouselIndicators1"
          className="carousel slide custom-carousel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="../pictures/1.jpg"
                className="d-block w-100 carousel-img"
                alt="Erbil city view"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../pictures/2.jpg"
                className="d-block w-100 carousel-img"
                alt="Erbil historical site"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../pictures/3.jpg"
                className="d-block w-100 carousel-img"
                alt="Erbil street scene"
              />
            </div>
            <div className="carousel-item">
              <img
                src="../pictures/4.jpg"
                className="d-block w-100 carousel-img"
                alt="Erbil landscape"
              />
            </div>
          </div>

          {/* Optional: Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselIndicators1"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselIndicators1"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

)
}
export default CardCoursel