import React from "react";
import { useTranslation } from "react-i18next";

export default function BackendHeader({  showCityFilter = false, onCityChange }) {
  const { t } = useTranslation();
  return (
    <div className=" pt-1 pb-1 ">
  

      {showCityFilter && (
        <div className="row g-2 align-items-center mb-1">
          <div className="col-12 col-md-6 order-2 order-md-1"></div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end order-1 order-md-2">
            <select
              className="form-select w-auto"
              id="cityFilter"
              onChange={(e) => onCityChange?.(e.target.value)}
            >
              <option value="">{t('admin.filter.default')}</option>
              {['Erbil', 'Sulaimani', 'Duhok', 'Halabja'].map(city => (
                <option key={city} value={city}>{t(`offcanvas.categories.${city}`)}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
