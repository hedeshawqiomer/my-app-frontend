import React from "react";

const CitySelection = ({
  city,
  setCity,
  district,
  setDistrict,
  showDistrict,
  setShowDistrict,
  cityDistricts
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
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
          <option value="">Choose city...</option>
          {Object.keys(cityDistricts).map((cityName) => (
            <option key={cityName} value={cityName}>{cityName}</option>
          ))}
        </select>
      </div>

      {showDistrict && (
        <div className="mb-3">
          <label htmlFor="district" className="form-label">District</label>
          <select
            className="form-select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="">Choose district...</option>
            {cityDistricts[city]?.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CitySelection;
