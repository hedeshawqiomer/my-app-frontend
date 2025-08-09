import React from "react";

function BackendHeader() {
  return (
    <div className="mt-2 pt-1">
      <div className="dashboard-header shadow-sm mb-3 p-3 rounded bg-white">
        <h1 className="fw-bold h4 mb-1">Pending Location Posts</h1>
        <p className="lead fs-6 mb-0">Review & approve submitted content manually</p>
      </div>

      <div className="row g-2 align-items-center mb-3">
        <div className="col-12 col-md-6 order-2 order-md-1">
          {/* room for future filters or counts */}
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end order-1 order-md-2">
          <select className="form-select w-auto" id="cityFilter">
            <option value="">Filter by City</option>
            <option value="Erbil">Erbil</option>
            <option value="Sulaimani">Sulaimani</option>
            <option value="Duhok">Duhok</option>
            <option value="Halabja">Halabja</option>
            <option value="Kirkuk">Kirkuk</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default BackendHeader;
