// src/components/PublicpagesComponents/ExplorepageComponents/CitySection.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardCoursel from "./CardCoursel";
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";
import { parseLatLng, buildDirectionsUrl } from "../../../utills/maps";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

export default function CitySection({ city, posts }) {
  const { t, i18n } = useTranslation();
  const [userLocation, setUserLocation] = useState(null);

  const formatNumber = (num) => {
    if (i18n.language === 'ku') {
      return new Intl.NumberFormat('ar-IQ').format(num);
    }
    return num.toFixed(2);
  };

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
        {t("explore.welcome", { city: t(`offcanvas.categories.${city}`) })}
      </h3>

      <p className="section-description">
        {posts.length ? null : t("explore.noPosts")}
      </p>

      <div className="cards-wrapper">
        {posts.map((post) => {
          const postLL = parseLatLng(post.location);
          const originLL = userLocation ?? center; // fallback to city center
          
          const originIsUser = !!userLocation;
          let distanceLabel = originIsUser ? t("explore.distance.your") : t("explore.distance.center");
          let distanceText = "—";

          if (postLL && originLL) {
            const km = getDistanceFromLatLonInKm(
              originLL.lat,
              originLL.lng,
              postLL.lat,
              postLL.lng
            );
            distanceText = `${formatNumber(km)} ${t("explore.card.distance.km")}`;
          } else if (!postLL) {
            distanceText = t("explore.card.distance.noLocation", "—");
          } else if (!originLL) {
            distanceText = t("explore.card.distance.unknownCenter", "—");
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
                  <h5 className="card-title text-success fw-bold">
                    {t("explore.card.city")}: {post.city ? t(`offcanvas.categories.${post.city}`, post.city) : ""}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <strong>{t("explore.card.district")}:</strong> {post.district ? t(`districts.${post.district}`, post.district) : ""}
                  </p>
                  {/* 👇 dynamic label */}
                  <p className="card-text text-muted mb-1">
                    <strong>{distanceLabel}:</strong> {distanceText}
                  </p>
                  <p className="card-text text-muted mb-1">
                    <strong>{t("explore.card.uploadedBy")}:</strong> {post.name}
                  </p>

                  <a
                    href={buildDirectionsUrl(originLL, post.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success w-100 mb-3"
                    title={
                      userLocation
                        ? t("explore.card.directionsTitle.user")
                        : t("explore.card.directionsTitle.center", { city })
                    }
                  >
                    {t("explore.card.directions")}
                  </a>

                  <small 
                    className="text-muted d-block" 
                    style={{ textAlign: i18n.language === 'ku' ? 'left' : 'right' }}
                  >
                    {post.createdAt || post.acceptedAt
                      ? new Date(post.acceptedAt || post.createdAt).toLocaleDateString(i18n.language === 'ku' ? 'ar-IQ' : 'en-US')
                      : "—"}
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
