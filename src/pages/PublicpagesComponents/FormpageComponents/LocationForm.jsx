import React from "react";
import { useTranslation } from "react-i18next";

function LocationForm({ location, setLocation }) {
  const { t } = useTranslation();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert(t("share.warnings.geolocationUnsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
     // GetLocationField.jsx
setLocation(`${lat},${lon}`);

      },
      (error) => {
        alert(t("share.warnings.geolocationError"));
        console.error(error);
      }
    );
  };

  return (
    <div className="mb-3">
      <label htmlFor="location" className="form-label">{t("share.form.location")}</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={location}
          readOnly
          required
        />
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={getLocation}
        >
          {t("share.form.getLocationBtn")}
        </button>
      </div>
    </div>
  );
}

export default LocationForm;
