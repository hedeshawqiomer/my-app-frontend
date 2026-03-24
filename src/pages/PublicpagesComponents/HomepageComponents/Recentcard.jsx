// src/components/PublicpagesComponents/HomepageComponents/Recentcard.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  safeHttpUrl,
  parseLatLng,
  chooseOrigin,
  buildDirectionsUrl,
} from "../../../utills/maps";
import { listPublicPosts } from "../../../api/public";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const toAbs = (u) => (u?.startsWith?.("/") ? `${API_BASE}${u}` : u || "");

/* ---------- component ---------- */

  /* ---------- component ---------- */

export default function Recentcard() {
  const { t, i18n } = useTranslation();
  const [userLocation, setUserLocation] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Helper to format numbers based on language
  const formatNumber = (num) => {
    if (i18n.language === 'ku') {
      return new Intl.NumberFormat('ar-IQ').format(num); // Use Arabic/Kurdish numerals
    }
    return num.toFixed(2);
  };

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
          <h1 className="display-4 fw-bold text-body-emphasis mt-1 mb-4 fs-1 text-gradient-gold">
            {t('home.topRated')}
          </h1>

          {recentPosts.map((post, index) => {
            const postLL = parseLatLng(post.location);      // post must store "lat,lng"
            const originLL = chooseOrigin(userLocation, post);
            const keyId = post.id ?? index;

            // Label: shows whether we used user location or city center
            const originIsUser = !!userLocation;
            const distanceLabel = originIsUser
              ? t("explore.card.distance.your")
              : t("explore.card.distance.cityCenter");

            // Compute distance only if we have both ends
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
              distanceText = t("explore.card.distance.noLocation");
            } else if (!originLL) {
              distanceText = t("explore.card.distance.unknownCenter");
            }

            return (
              <div className="col-lg-4 col-md-6" key={keyId}>
                <div
                  className="card custom-card fade-in-strong"
                  style={{ textAlign: i18n.language === "ku" ? "right" : "left" }}
                >
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

                  <div className="card-body px-4 py-3">
                    <div className="d-flex align-items-baseline gap-2 mb-2">
                       <h5 className="card-title fs-4 fw-bold text-success m-0">
                         {t("explore.card.city")}:
                       </h5>
                       <span className="fs-5 fw-bold text-body">
                         {post.city ? t(`offcanvas.categories.${post.city}`, post.city) : ""}
                       </span>
                    </div>

                    <div className="d-flex align-items-baseline gap-2 mb-3">
                      <strong className="text-body-secondary">
                        {t("explore.card.district")}:
                      </strong>
                      <span className="text-muted">
                        {post.district ? t(`districts.${post.district}`, post.district) : ""}
                      </span>
                    </div>

                    <div className="d-flex align-items-baseline gap-2 mb-2">
                      <strong className="text-body-secondary">
                        {distanceLabel}:
                      </strong>
                      <span className="text-muted">
                       {distanceText}
                      </span>
                    </div>

                    <div className="d-flex align-items-baseline gap-2 mb-4">
                      <strong className="text-body-secondary">
                        {t("explore.card.uploadedBy")}:
                      </strong>
                      <span className="text-muted">
                        {post.uploaderName || post.name || "Unknown"}
                      </span>
                    </div>
                    
                    <a
                      href={buildDirectionsUrl(originLL, post.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100"
                      title={t("explore.card.directions")}
                    >
                      {t("explore.card.directions")}
                    </a>
                  </div>

                  <div className="card-footer d-flex justify-content-end align-items-center py-2 px-4">
                    <small className="text-body-secondary">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString(i18n.language === 'ku' ? 'ar-IQ' : 'en-US')
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
                        <h5 className="modal-title">
                          {post.city ? t(`offcanvas.categories.${post.city}`, post.city) : ""}
                          {post.district ? ` - ${t(`districts.${post.district}`, post.district)}` : ""}
                        </h5>
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
