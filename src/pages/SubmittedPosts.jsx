import React, { useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SubmittedPosts() {
  const { t } = useTranslation();
  const location = useLocation();

  // Allow if we *just* navigated here from a real submission
  const fromState    = location.state?.fromSubmission === true;
  // …or if we set a flag right after submit (survives redirects/hard refresh)
  const fromStorage  = sessionStorage.getItem("fromSubmission") === "true";
  const allow        = fromState || fromStorage;

  // (Optional) Clear the flag when leaving the page so it can’t be re-opened later
  useEffect(() => {
    return () => sessionStorage.removeItem("fromSubmission");
  }, []);

  if (!allow) {
    // Block direct URL access: go to a 403 page (or home if you prefer)
    return <Navigate to="/" replace />;
  }

  // Normal UI (unchanged)
  return (
    <div className="container py-5 text-center">
      <h2 className="text-success mb-3">{t("submitted.title")}</h2>
      <p>{t("submitted.message")}</p>
      <Link to="/" className="btn btn-success mt-4">{t("submitted.backHome")}</Link>
    </div>
  );
}
