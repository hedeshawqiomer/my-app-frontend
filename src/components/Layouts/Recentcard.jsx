import React, { useEffect, useState } from "react";
import { getAcceptedPosts } from "../../utills/postStore";
import cityCenters from "../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../utills/Geolocation";

function Recentcard() {
  const [userLocation, setUserLocation] = useState(null);
const recentPosts = getAcceptedPosts()
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 6);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.warn("Location access denied:", err);
      }
    );
  }, []);

  return (
    <section className="container-fluid secondsec">
      <div className="container">
        <div className="row g-4">
          <h1
            className="display-4 fw-bold text-body-emphasis mt-1 mb-4 fs-1"
            style={{
              fontFamily: "sans-serif",
              background: "linear-gradient(to right, #d8cb16, #6d6603)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Top Rated Resorts
          </h1>

          {recentPosts.map((post, index) => {
            const center = cityCenters[post.city];
            let distanceText = "Distance unavailable";

            if (userLocation && center) {
              const dist = getDistanceFromLatLonInKm(
                userLocation.lat,
                userLocation.lng,
                center.lat,
                center.lng
              );
              distanceText =  `${dist.toFixed(2)}`;
            }

            return (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="card custom-card fade-in-strong">
                  <img
                    src={post.images[0]}
                    className="card-img-top custom-img"
                    alt="Resort"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#carouselModal${index}`}
                  />
                  <div className="card-body px-4 py-3 text-start">
                    <h5 className="card-title fs-4 fw-bold mb-2">City: {post.city}</h5>
                    <p className="card-text text-muted mb-1">
                      <strong>District:</strong> {post.district}
                    </p>
                 
                    <p className="card-text text-muted mb-1">
                      <strong> Dist. From City: </strong>{distanceText}
                    </p>
                    <p className="card-text text-muted">
                     <strong>Uploaded by: </strong>{post.name}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        post.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success w-100"
                    >
                      View on Map
                    </a>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center py-2 px-4">
                    <small className="text-body-secondary">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>

                {/* Modal Carousel */}
                <div
                  className="modal fade"
                  id={`carouselModal${index}`}
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{post.city} - Gallery</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div
                          id={`carouselIndicators${index}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {post.images.map((img, i) => (
                              <div
                                className={`carousel-item ${i === 0 ? "active" : ""}`}
                                key={i}
                              >
                                <img
                                  src={img}
                                  className="d-block w-100"
                                  alt={`Slide ${i + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselIndicators${index}`}
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselIndicators${index}`}
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Recentcard;
