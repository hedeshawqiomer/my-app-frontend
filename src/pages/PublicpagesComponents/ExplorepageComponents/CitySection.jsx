// src/components/PublicpagesComponents/ExplorepageComponents/CitySection.jsx
import React, { useState, useEffect } from "react";
import CardCoursel from "./CardCoursel";
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

// Allow only http/https for string URLs (defensive)
function safeHttpUrl(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const url = new URL(u, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

// Parse "lat,lng" to { lat, lng } or null
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

// Build Google Maps directions URL
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

export default function CitySection({ city, posts }) {
  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location (with cleanup)
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        if (cancelled) return;
        console.warn("Location access denied/unavailable:", err);
        setUserLocation(null);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="secondsec3 py-4" id={city}>
      <h3
        className="section-heading text-success mb-2"
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

      {!posts.length && (
        <p className="section-description">No approved posts yet for this city.</p>
      )}

      <div className="cards-wrapper">
        {posts.map((post) => {
          // image can be string or {url}
          const firstImg =
            safeHttpUrl(
              typeof post.images?.[0] === "string"
                ? post.images[0]
                : post.images?.[0]?.url
            ) || toAbs(post.images?.[0]?.url) || "/pictures/placeholder.jpg";

          // distance calc
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

          const pid = post.id ?? `${post.city}-${post.createdAt}`;

          return (
            <div className="half-card" key={pid}>
              <div className="card">
                <img
                  src={firstImg}
                  className="card-img-top"
                  alt={post.name || `${post.city} resort`}
                  loading="lazy"
                  width="1200"
                  height="800"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target={`#carouselModal-${pid}`}
                />
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    City: {post.city}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <strong>District:</strong> {post.district}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Dist. From City:</strong> {distanceText}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>Uploaded by:</strong> {post.name}
                  </p>

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

      {/* Carousels */}
      {posts.map((post) => {
        const pid = post.id ?? `${post.city}-${post.createdAt}`;
        return <CardCoursel key={pid} post={{ ...post, _pid: pid }} />;
      })}
    </section>
  );
}
