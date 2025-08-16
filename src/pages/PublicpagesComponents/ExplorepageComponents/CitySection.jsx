
import React ,{useState, useEffect}from "react";
import CardCoursel from "./CardCoursel";
import cityCenters from "../../../utills/CityCenter";
import { getDistanceFromLatLonInKm } from "../../../utills/Geolocation";
function CitySection({ city, posts }) {
      
        const [userLocation, setUserLocation] = useState(null);
        // Get user's current location
        useEffect(() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (err) => {
              console.warn("Location access denied:", err);
            }
          );
        }, []);
  return (
    <section className="secondsec3" id={city}>
      <h3        style={{
          fontSize: "58px",
          fontFamily: "sans-serif",
          background: "linear-gradient(to right, #d8cb16, #6d6603)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }} className="section-heading text-success">{`Welcome to ${city}`}</h3>
      <p className="section-description">
        {posts.length
          ?null: "No approved posts yet for this city."}
      </p>

      <div className="cards-wrapper">
        {posts.map((post) => {
          const center = cityCenters[post.city];
          let distanceText = "Distance unavailable";

          if (userLocation && center) {
            const dist = getDistanceFromLatLonInKm(
              userLocation.lat,
              userLocation.lng,
              center.lat,
              center.lng
            );
            distanceText = `${dist.toFixed(2)}`;
          }
          return (
            <div className="half-card" key={post.id}>
              <div className="card">
                <img
                  src={post.images[0]}
                  className="card-img-top"
                  alt={post.name}
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target={`#carouselModal-${post.id}`}
                />
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">
                    City: {post.city}
                  </h5>
                  <p className="card-text text-muted mb-1"><strong>District:</strong> {post.district}</p>
                  <p className="card-text text-muted mb-1">
                    <strong> Dist. From City:</strong> {distanceText}
                  </p>
                  <p className="card-text text-muted mb-1"><strong>Uploaded by:</strong> {post.name}</p>
                  <a
                    href={`https://maps.google.com?q=${encodeURIComponent(post.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success w-100 mb-3"
                  >
                    📍 View on Map
                  </a>
                  <small className="text-muted">
                    {new Date(post.acceptedAt || post.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel for this city's posts */}
      {posts.map((post) => (
        <CardCoursel key={post.id} post={post} />
      ))}
    </section>
  );
}
export default CitySection;
