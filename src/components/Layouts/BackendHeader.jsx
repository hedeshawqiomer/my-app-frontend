import React from "react";

function BackendHeader() {
  return (
    <div className="container-fluid mt-2 pt-1">
      <div className="dashboard-header shadow-sm mb-4">
        <h1 className="fw-bold">Pending Location Posts</h1>
        <p className="lead">Review & approve submitted content manually</p>
      </div>

      <div className="filter-by-city d-flex justify-content-center justify-content-md-end mb-3">
        <select className="form-select w-auto" id="cityFilter">
          <option value="">Filter by City</option>
          <option value="Erbil">Erbil</option>
          <option value="Sulaimani">Sulaimani</option>
          <option value="Duhok">Duhok</option>
          <option value="Halabja">Halabja</option>
          <option value="Kirkuk">Kirkuk</option>
        </select>
      </div>
    </div> // ✅ This was missing
  );
}

export default BackendHeader;
