import React from "react";

function MoreAbout() {
  return (
    <section className="secondsec2" id="heroSection">
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center justify-content-between g-5 py-5">
          <div className="col-10 col-sm-12 col-lg-6 image-col mx-auto d-flex justify-content-center">
            <img
              src="/pictures/map2.png"
              className="img-fluid custom-hero-img slide-down"
              alt="..."
              loading="lazy"
            />
          </div>

          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-4 fade-down text-gradient-gold">
              Discover the Perfect Spot for Your Next Vacation
            </h1>

            <p className="lead fw-bold fade-down">
              Planning a picnic starts with finding the right location a place
              that combines natural beauty, comfort, and accessibility. Ideal
              picnic spots often include parks, riverbanks, lakesides, or quiet
              hills with scenic views. When searching for the perfect place, you
              can also check online maps, reviews, and local recommendations to
              discover hidden gems
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MoreAbout;
