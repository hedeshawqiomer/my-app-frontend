// src/components/PublicpagesComponents/HomepageComponents/Recentcard.jsx
import React, { useEffect, useState } from "react";
import { listPublicPosts } from "../../../api/public"; // GET /posts/public
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

/* ---------- helpers ---------- */

// only allow http/https images
function safeHttpUrl(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const url = new URL(u, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

// parse "lat,lng" -> {lat, lng}
function parseLatLng(input) {
  if (!input || typeof input !== "string") return null;
  const m = input.trim().match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[3]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

// strict city-center lookup by post.city (case-insensitive fallback)
function getCityCenterFor(post) {
  const name = String(post?.city ?? "").trim();
  if (cityCenters[name]) return cityCenters[name];
  const foundKey = Object.keys(cityCenters).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return foundKey ? cityCenters[foundKey] : null;
}

// choose origin: user first, else city center (or null if unknown)
function chooseOrigin(userLoc, post) {
  return userLoc ?? getCityCenterFor(post) ?? null;
}

// build Google Maps directions forcing the chosen origin if available
function buildDirectionsUrl(originLL, destStr) {
  const destLL = parseLatLng(destStr);
  const base = "https://www.google.com/maps/dir/?api=1";
  const travel = "travelmode=driving";

  const originParam = originLL ? `origin=${originLL.lat},${originLL.lng}` : null;
  const destinationParam = destLL
    ? `destination=${destLL.lat},${destLL.lng}`
    : `destination=${encodeURIComponent(destStr || "")}`;

  // if no origin (unknown city), omit origin → Google will use “Your location”
  return [base, originParam, destinationParam, travel].filter(Boolean).join("&");
}

/* ---------- component ---------- */

export default function Recentcard() {
  const [userLocation, setUserLocation] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Load posts (accepted/public) from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await listPublicPosts();
        const normalized = (data || []).map((p) => ({
          ...p,
          images: (p.images || []).map((img) =>
            safeHttpUrl(typeof img === "string" ? img : toAbs(img?.url))
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

  // Try to get user location (non-blocking)
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    let cancelled = false;

    const options = { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        if (cancelled) return;
        console.warn("Location access denied/unavailable:", err);
        setUserLocation(null);
      },
      options
    );

    return () => {
      cancelled = true;
    };
  }, []);

  // Reveal cards animation
  useEffect(() => {
    const cards = document.querySelectorAll(".custom-card");
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = [...document.querySelectorAll(".custom-card")].indexOf(card);
          card.style.setProperty("--delay", `${index * 0.2}s`);
          card.classList.add("visible");
          obs.unobserve(card);
        }
      });
    });

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [recentPosts]);

  return (
    <section className="px-3 container-fluid secondsec">
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
            const postLL = parseLatLng(post.location);      // post must store "lat,lng"
            const originLL = chooseOrigin(userLocation, post);
            const keyId = post.id ?? index;

            // Label: shows whether we used user location or city center
            const originIsUser = !!userLocation;
            const distanceLabel = originIsUser
              ? "Your distance"
              : "City center distance";

            // Compute distance only if we have both ends
            let distanceText = "—";
            if (postLL && originLL) {
              const km = getDistanceFromLatLonInKm(
                originLL.lat,
                originLL.lng,
                postLL.lat,
                postLL.lng
              );
              distanceText = `${km.toFixed(2)} km`;
            } else if (!postLL) {
              distanceText = "No location";
            } else if (!originLL) {
              distanceText = "City center unknown";
            }

            return (
              <div className="col-lg-4 col-md-6" key={keyId}>
                <div className="card custom-card fade-in-strong">
                  <img
                    src={post.images?.[0] || ""}
                    className="card-img-top custom-img"
                    alt="Resort"
                    loading="lazy"
                    width="1200"
                    height="800"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#carouselModal${keyId}`}
                  />

                  <div className="card-body px-4 py-3 text-start">
                    <h5 className="card-title fs-4 fw-bold mb-2">
                      City: {post.city}
                    </h5>

                    <p className="card-text text-muted mb-1">
                      <strong>District:</strong> {post.district}
                    </p>

                    <p className="card-text text-muted mb-1">
                      <strong>{distanceLabel}:</strong> {distanceText}
                    </p>

                    <p className="card-text text-muted">
                      <strong>Uploaded by:</strong> {post.name}
                    </p>

                    <a
                      href={buildDirectionsUrl(originLL, post.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100"
                      title="Open Google Maps directions"
                    >
                      🧭 Directions in Google Maps
                    </a>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center py-2 px-4">
                    <small className="text-body-secondary">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "—"}
                    </small>
                  </div>
                </div>

                {/* Modal Carousel */}
                <div
                  className="modal fade"
                  id={`carouselModal${keyId}`}
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
                          id={`carouselIndicators${keyId}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {(post.images || []).length === 0 ? (
                              <div className="carousel-item active">
                                <img
                                  src="/pictures/placeholder.jpg"
                                  className="d-block w-100"
                                  alt="No images"
                                  loading="lazy"
                                  width="1200"
                                  height="800"
                                />
                              </div>
                            ) : (
                              post.images.map((img, i) => (
                                <div
                                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                                  key={`${keyId}-${i}`}
                                >
                                  <img
                                    src={img}
                                    className="d-block w-100"
                                    alt={`Slide ${i + 1}`}
                                    loading="lazy"
                                    width="1200"
                                    height="800"
                                  />
                                </div>
                              ))
                            )}
                          </div>

                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselIndicators${keyId}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                          </button>

                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselIndicators${keyId}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
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
