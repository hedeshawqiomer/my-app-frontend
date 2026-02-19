import React from "react";
import { useTranslation } from "react-i18next";

function ExplanationCard() {
  const { t } = useTranslation();
  return (
    <div className=" forExplanation card shadow p-4">
      <h3    style={{
          fontSize: "37px",
          fontFamily: "sans-serif",
          background: "linear-gradient(to right, #d8cb16, #6d6603)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }} className="text-success fw-bold mb-3">{t("share.whyShareTitle")}</h3>
      <p>
        {t("share.whyShareText")}
      </p>
      <ul>
        <li>{t("share.whyShareList.1")}</li>
        <li>{t("share.whyShareList.2")}</li>
        <li>{t("share.whyShareList.3")}</li>
      </ul>
      <p className="text-muted mt-3 small">
        {t("share.whyShareFooter")}
      </p>
    </div>
  );
}

export default ExplanationCard;
