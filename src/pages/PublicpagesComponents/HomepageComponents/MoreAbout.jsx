import React from "react";
import { useTranslation } from "react-i18next";

function MoreAbout() {
  const { t } = useTranslation();
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
              {t('home.subtitle')}
            </h1>

            <p className="lead fw-bold fade-down">
              {t('home.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MoreAbout;
