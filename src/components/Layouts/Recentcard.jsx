import React from "react";
import CardCourselMainPage from "./CardCourselMainPage";
function Recentcard(){
return(
<section className="container-fluid secondsec">
    <div className="container">
      <div className="row g-4">
        <h1 className="display-4 fw-bold text-body-emphasis mt-1 mb-4 fs-1" style={{fontFamily: 'sans-serif', background: 'linear-gradient(to right, #d8cb16, #6d6603)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>Top Rated Resorts</h1>

        {/* CARD 1 */}
        <div className="col-lg-4 col-md-6">
          <div className="card custom-card   fade-in-strong">
            <img src="../pictures/main-section.jpg" className="card-img-top custom-img"
              alt="City Image" style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#carouselModal1" />
            <div className="card-body px-4 py-3 text-start">
              <h5 className="card-title fs-4 fw-bold mb-2">City: Erbil</h5>
              <p className="card-text text-muted mb-1"><strong>District:</strong> Ankawa</p>
              <p className="card-text text-muted mb-1">Dist. from center: <strong>10km</strong></p>
              <p className="card-text text-muted">Uploaded by: <strong>Ali Muhammed</strong></p>
              <a href="https://www.google.com/maps/place/Erbil+Citadel/@36.1911,44.0090,15z" target="_blank"
                className="btn btn-outline-success d-flex align-items-center justify-content-center" style={{width: '100%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 
             3 3 0 0 1 0 6" />
                </svg>
                View on Map
              </a>

            </div>
            <div className="card-footer d-flex justify-content-between align-items-center py-2 px-4">
              <div className="d-flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z" />
                </svg>
              </div>
              <small className="text-body-secondary">2/5/2025</small>
            </div>

          </div>
        </div>
  
        {/* Modal with Bootstrap Carousel */}
            <CardCourselMainPage />
</div>
        </div>
</section>
       

)

}
export default Recentcard;