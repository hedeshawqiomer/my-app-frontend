import React from "react";
import { useTranslation } from "react-i18next";

const CitySelection = ({
  city,
  setCity,
  district,
  setDistrict,
  showDistrict,
  setShowDistrict,
  cityDistricts
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">{t("share.form.city")}</label>
        <select
          className="form-select"
          value={city}
          onChange={(e) => {
            const selectedCity = e.target.value;
            setCity(selectedCity);
            setShowDistrict(!!selectedCity);
            setDistrict(""); // clear district when city changes
          }}
          required
        >
          <option value="">{t("share.form.cityPlaceholder")}</option>
          {Object.keys(cityDistricts).map((cityName) => (
            <option key={cityName} value={cityName}>{t(`offcanvas.categories.${cityName}`)}</option>
          ))}
        </select>
      </div>

      {showDistrict && (
        <div className="mb-3">
          <label htmlFor="district" className="form-label">{t("share.form.district")}</label>
          <select
            className="form-select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="">{t("share.form.districtPlaceholder")}</option>
            {cityDistricts[city]?.map((dist) => (
              <option key={dist} value={dist}>{t(`districts.${dist}`, { defaultValue: dist })}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CitySelection;

