import React from "react";
function CardCourselMainPage(){
        {/* Modal with Bootstrap Carousel */}
        return (
        <div className="modal fade" id="carouselModal1" tabIndex="-1" aria-labelledby="carouselModalLabel1"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="carouselModalLabel1">Erbil - Gallery</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div id="carouselExampleIndicators1" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0"
                      className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1"
                      aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2"
                      aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="3"
                      aria-label="Slide 4"></button>
                  </div>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="../pictures/1.jpg" className="d-block w-100" alt="Slide 1" />
                    </div>   
                  </div>

                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        )

}
export default CardCourselMainPage