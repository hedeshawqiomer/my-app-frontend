// src/components/PublicpagesComponents/HomepageComponents/Recentcard.jsx
import React, { useEffect, useState } from "react";
import { listPublicPosts } from "../../../api/public"; // GET /posts/public
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");
// Helpers: parse "lat,lng" OR treat as a free-text address
function parseLatLng(input) {
  if (!input || typeof input !== "string") return null;
  const m = input.trim().match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[3]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  // quick sanity range check
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

function buildDirectionsUrl(userLoc, destStr) {
  const destLatLng = parseLatLng(destStr);
  const base = "https://www.google.com/maps/dir/?api=1";
  const travel = "travelmode=driving"; // or walking/transit/bicycling

  const destinationParam = destLatLng
    ? `destination=${destLatLng.lat},${destLatLng.lng}`
    : `destination=${encodeURIComponent(destStr || "")}`;

  // If user location available, pass as origin; else omit (Maps will use “Your location”)
  const originParam = userLoc
    ? `origin=${userLoc.lat},${userLoc.lng}`
    : null;

  return [base, originParam, destinationParam, travel]
    .filter(Boolean)
    .join("&");
}


function Recentcard() {
  const [userLocation, setUserLocation] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Load from backend instead of localStorage
  useEffect(() => {
    (async () => {
      try {
        const data = await listPublicPosts(); // accepted/public posts
        const normalized = (data || []).map((p) => ({
          ...p,
          images: (p.images || []).map((img) =>
            typeof img === "string" ? img : toAbs(img?.url)
          ),
        }));

        const top6 = normalized
          .sort(
            (a, b) =>
              new Date(b.acceptedAt || b.createdAt || 0) -
              new Date(a.acceptedAt || a.createdAt || 0)
          )
          .slice(0, 6);

        setRecentPosts(top6);
      } catch (e) {
        console.error("Failed to load public posts", e);
        setRecentPosts([]);
      }
    })();
  }, []);
  // Get user's current location
useEffect(() => {
  if (!("geolocation" in navigator)) return;

  const options = {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 30000,
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (err) => {
      console.warn("Location access denied/unavailable:", err);
      setUserLocation(null); // fallback will still work
    },
    options
  );
}, []);

  
  useEffect(() => {
    // re-run when cards exist in the DOM
    const cards = document.querySelectorAll(".custom-card");
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = [...document.querySelectorAll(".custom-card")].indexOf(card);
          card.style.setProperty("--delay", `${index * 0.2}s`);
          card.classList.add("visible");  // <-- removes the washed-out look
          obs.unobserve(card);
        }
      });
    });

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
}, [recentPosts]); // << depend on the data you map over

return (
  <section className=" px-3 container-fluid secondsec">
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
              distanceText = `${dist.toFixed(2)}`;
            }

            return (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="card custom-card fade-in-strong">
                  <img
                    src={post.images?.[0]}
                    className="card-img-top custom-img"
                    alt="Resort"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#carouselModal${index}`}
                  />
                  <div className="card-body px-4 py-3 text-start">
                    <h5 className="card-title fs-4 fw-bold mb-2">
                      City: {post.city}
                    </h5>
                    <p className="card-text text-muted mb-1">
                      <strong>District:</strong> {post.district}
                    </p>
                    <p className="card-text text-muted mb-1">
                      <strong> City Center .Dist: </strong>
                      {distanceText}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Uploaded by: </strong>
                      {post.name}
                    </p>
                   <a
  href={buildDirectionsUrl(userLocation, post.location)}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-success w-100"
  title="Open Google Maps directions from your location"
>
  🧭 Directions in Google Maps
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
                            {post.images?.map((img, i) => (
                              <div
                                className={`carousel-item ${
                                  i === 0 ? "active" : ""
                                }`}
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
                {/* /Modal */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Recentcard;
