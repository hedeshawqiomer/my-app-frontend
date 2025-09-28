// src/components/PublicpagesComponents/ExplorepageComponents/CitySection.jsx
import React, { useEffect, useState } from "react";
import CardCoursel from "./CardCoursel";
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

/* ----- helpers ----- */
function parseLatLng(input) {
  if (!input || typeof input !== "string") return null;
  const m = input.trim().match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[3]);
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

// Build Google Maps directions URL
function buildDirectionsUrl(userLoc, cityCenter, destStr, travelMode = "driving") {
  const destLatLng = parseLatLng(destStr);
  const base = "https://www.google.com/maps/dir/?api=1";
  const destinationParam = destLatLng
    ? `destination=${destLatLng.lat},${destLatLng.lng}`
    : `destination=${encodeURIComponent(destStr || "")}`;

  const origin = userLoc ?? cityCenter; // fallback to city center
  const originParam = origin ? `origin=${origin.lat},${origin.lng}` : null;

  const modeParam = `travelmode=${encodeURIComponent(travelMode)}`;
  return [base, originParam, destinationParam, modeParam].filter(Boolean).join("&");
}

export default function CitySection({ city, posts }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation(null),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }, []);

  const center = cityCenters[city]; // used as fallback origin

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
          const postLL = parseLatLng(post.location);
          let distanceText = "—";
          let distanceLabel = userLocation ? "Your Distance" : "City Center Distance";

          if (postLL) {
            const origin = userLocation ?? center;
            if (origin) {
              const km = getDistanceFromLatLonInKm(
                origin.lat,
                origin.lng,
                postLL.lat,
                postLL.lng
              );
              distanceText = `${km.toFixed(2)} km`;
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
                  data-bs-target={`#modal-${post.id}`} // matches CardCoursel modal id
                />
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">City: {post.city}</h5>
                  <p className="card-text text-muted mb-1">
                    <strong>District:</strong> {post.district}
                  </p>
                  {/* 👇 dynamic label */}
                  <p className="card-text text-muted mb-1">
                    <strong>{distanceLabel}:</strong> {distanceText}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Uploaded by:</strong> {post.name}
                  </p>

                  <a
                    href={buildDirectionsUrl(userLocation, center, post.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success w-100 mb-3"
                    title={
                      userLocation
                        ? "Open Google Maps directions from your location"
                        : `Open Google Maps directions from ${city} center`
                    }
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

      {posts.map((post) => (
        <CardCoursel key={post.id} post={post} />
      ))}
    </section>
  );
}
