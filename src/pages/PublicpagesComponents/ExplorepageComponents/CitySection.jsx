import React, { useState, useEffect } from "react";
import CardCoursel from "./CardCoursel";
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

function CitySection({ city, posts }) {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

  // ---------- Helpers ----------
  // Parse "lat,lng" text to { lat, lng } or return null
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

  // Build a Google Maps Directions URL
  function buildDirectionsUrl(userLoc, destStr, travelMode = "driving") {
    const destLatLng = parseLatLng(destStr);
    const base = "https://www.google.com/maps/dir/?api=1";
    const destinationParam = destLatLng
      ? `destination=${destLatLng.lat},${destLatLng.lng}`
      : `destination=${encodeURIComponent(destStr || "")}`;
    const originParam = userLoc ? `origin=${userLoc.lat},${userLoc.lng}` : null;
    const modeParam = `travelmode=${encodeURIComponent(travelMode)}`;
    return [base, originParam, destinationParam, modeParam].filter(Boolean).join("&");
  }
  // -----------------------------

  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location (robust)
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    const options = { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.warn("Location access denied/unavailable:", err);
        setUserLocation(null); // graceful fallback
      },
      options
    );
  }, []);

  return (
    <section className="secondsec3" id={city}>
      <h3
        className="section-heading text-success"
        style={{
          fontSize: "58px",
          fontFamily: "sans-serif",
          background: "linear-gradient(to right, #d8cb16, #6d6603)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {`Welcome to ${city}`}
      </h3>

      <p className="section-description">
        {posts.length ? null : "No approved posts yet for this city."}
      </p>

      <div className="cards-wrapper">
        {posts.map((post) => {
          // ---- distance calc (uses post coords if available; falls back to city center) ----
          let distanceText = "Distance unavailable";
          const destLatLng = parseLatLng(post.location);
          const center = cityCenters[post.city];

          if (userLocation) {
            const target = destLatLng || center;
            if (target) {
              const dist = getDistanceFromLatLonInKm(
                userLocation.lat,
                userLocation.lng,
                target.lat,
                target.lng
              );
              distanceText = `${dist.toFixed(2)}`;
            }
          }

          return (
            <div className="half-card" key={post.id}>
              <div className="card">
                <img
                  src={toAbs(post.images?.[0]?.url)}
                  className="card-img-top"
                  alt={post.name}
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target={`#carouselModal-${post.id}`}
                />
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    City: {post.city}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <strong>District:</strong> {post.district}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Dist. From City:</strong> {distanceText} km
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Uploaded by:</strong> {post.name}
                  </p>

                  {/* Directions button (origin=user location if allowed) */}
                  <a
                    href={buildDirectionsUrl(userLocation, post.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success w-100 mb-3"
                    title="Open Google Maps directions from your location"
                  >
                    🧭 Directions in Google Maps
                  </a>

                  <small className="text-muted">
                    {new Date(post.acceptedAt || post.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel for this city's posts */}
      {posts.map((post) => (
        <CardCoursel key={post.id} post={post} />
      ))}
    </section>
  );
}

export default CitySection;
