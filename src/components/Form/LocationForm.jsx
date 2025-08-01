import React from "react";

function GetLocationField({ location, setLocation }) {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`Lat: ${lat}, Lng: ${lon}`);
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
      }
    );
  };

  return (
    <div className="mb-3">
      <label htmlFor="location" className="form-label">Your Current Location</label>
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
          Get Location
        </button>
      </div>
    </div>
  );
}

export default GetLocationField;
