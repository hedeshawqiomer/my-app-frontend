import React from "react";
import { useTranslation } from "react-i18next";

function BasicInfo({ name, setName, email, setEmail }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          {t("share.form.name")}
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={t("share.form.namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

  

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          {t("share.form.email")} <small className="text-body-secondary">{t("share.form.emailOptional")}</small>
        </label>
        <input
          type="email"
          className="form-control"
          placeholder={t("share.form.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
       
        />
      </div>
    </>
  );
}

export default BasicInfo;
