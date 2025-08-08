import React from "react";
import "./CardCoursel"
import CardCoursel from "./CardCoursel";
function Duhok(){
return (
      <>
    <section className="secondsec3" id="Duhok">
      <h3
        className="section-heading text-success"
        style={{
          fontSize: "70px",
          fontFamily: "sans-serif",
          background: "linear-gradient(to right, #d8cb16, #6d6603)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent"
        }}
      >
        Welcome To Duhok
      </h3>

      <p
        className="section-description"
        style={{
          fontSize: "23px",
          fontFamily: "sans-serif",
          paddingBottom: "20px"
        }}
      >
        Peaceful nature and kind-hearted people.
      </p>

      <div className="cards-wrapper">
        {/* Card 1 */}
      

        {/* Card 4 */}
        <div className="half-card">
          <div className="card">
            <img
              src="../pictures/5.jpg"
              className="card-img-top"
              alt="..."
              loading="lazy"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#carouselModal1"
            />

            <div className="card-body">
              <h5 className="card-title text-success fw-bold">City: Duhok</h5>
              <p><strong>District:</strong> Qazraw</p>
              <p>Dist. from center: <strong>8km</strong></p>
              <p>Uploaded by: <strong>Yadgar Saber</strong></p>
              <button className="btn btn-outline-success w-100 mb-3">
                <i className="bi bi-geo-alt-fill"></i> View on Map
              </button>
              <div className="d-flex justify-content-between align-items-center">
           
                <small className="text-muted">2/5/2025</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<CardCoursel />
    </>
);
}
export default Duhok;