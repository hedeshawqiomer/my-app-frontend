import React from "react";

export default function BackendHeaderHeader({  showCityFilter = false, onCityChange }) {
  return (
    <div className="mt-2 pt-1 mb-3 pb-3 ">
  

      {showCityFilter && (
        <div className="row g-2 align-items-center mb-3">
          <div className="col-12 col-md-6 order-2 order-md-1"></div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end order-1 order-md-2">
            <select
              className="form-select w-auto"
              id="cityFilter"
              onChange={(e) => onCityChange?.(e.target.value)}
            >
              <option value="">Filter by City</option>
              <option value="Erbil">Erbil</option>
              <option value="Sulaimani">Sulaimani</option>
              <option value="Duhok">Duhok</option>
              <option value="Halabja">Halabja</option>
              <option value="Kirkuk">Kirkuk</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
