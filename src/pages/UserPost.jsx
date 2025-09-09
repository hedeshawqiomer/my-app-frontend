// src/components/UserPost.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import "../assets/custom_css3.css";
import ImageUploader from "./PublicpagesComponents/FormpageComponents/ImageFunctionality";
import BasicInfo from "./PublicpagesComponents/FormpageComponents/BasicInfo";
import CitySelection from "./PublicpagesComponents/FormpageComponents/CitySelection";
import LocationForm from "./PublicpagesComponents/FormpageComponents/LocationForm";
import ExplanationCard from "./PublicpagesComponents/FormpageComponents/ExplanationCard";
import { createPost } from "../api/post";
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import { useNavigate } from "react-router-dom";

function UserPost() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");                 // optional field
  const [location, setLocation] = useState("");           // "lat,lng" (e.g., "36.1909,44.0069")
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [showDistrict, setShowDistrict] = useState(false);
  const [images, setImages] = useState([]);               // [{file, previewUrl}] or [File]
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const cityDistricts = {
    Erbil: ["Hawler", "Soran", "Shaqlawa", "Mergasor", "Choman", "Koye", "Rwanduz", "Dashti Hawler"],
    Sulaimani: ["Slemani", "Bazyan", "Penjwen", "Qaradax", "Sharbazher", "Dukan", "Ranya", "Pashadar", "Penjwin", "Chemchemal"],
    Duhok: ["Duhok", "Akre", "Zakho", "Amadiya", "Simele", "Bardarash", "Shekhan"],
    Halabja: ["Halbja", "Khurmal", "Byara", "Tawella"],
  };

  // Navbar shrink on scroll (UX polish)
  useEffect(() => {
    const navbar = document.querySelector("#mainNav");
    const handleScroll = () => {
      if (window.scrollY === 0) navbar?.classList.remove("navbar-shrink");
      else navbar?.classList.add("navbar-shrink");
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize images to File[]
    const files = images.map((it) => (it?.file ? it.file : it)).filter(Boolean);
    if (files.length < 4) {
      setWarning("Please upload at least 4 images.");
      return;
    }

    // --- Sanitize key fields ---
    const _name = name.trim();
    const _email = email.trim();
    const _city = city.trim();
    const _district = district.trim();
    const _location = location.trim();

    // --- Length limits (defensive UX) ---
    if (_name.length > 80) {
      setWarning("Name is too long (max 80 characters).");
      return;
    }
    if (_email && _email.length > 120) {
      setWarning("Email is too long (max 120 characters).");
      return;
    }
    if (_city.length > 50 || _district.length > 50) {
      setWarning("City/District names are too long.");
      return;
    }
    if (_location.length > 100) {
      setWarning("Location input is too long.");
      return;
    }

    // --- Required checks (use sanitized values) ---
    if (!_name || !_city || !_district || !_location) {
      setWarning("Fill all required fields (name, city, district, location, 4+ images).");
      return;
    }

    // Optional: light email format validation (email is optional)
    if (_email && !/^\S+@\S+\.\S+$/.test(_email)) {
      setWarning("Please enter a valid email address.");
      return;
    }

    // Minimal lat,lng format check
    const locOk = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(_location);
    if (!locOk) {
      setWarning("Location must be in 'lat,lng' format, e.g. 36.1909,44.0069");
      return;
    }

    setWarning("");
    setSubmitting(true);

    try {
      // Send sanitized values
      await createPost(
        { name: _name, email: _email, city: _city, district: _district, location: _location },
        files
      );

      // Clear the form
      setName("");
      setEmail("");
      setLocation("");
      setCity("");
      setDistrict("");
      setShowDistrict(false);
      setImages([]);

sessionStorage.setItem("fromSubmission", "true"); // optional: survive redirects
navigate("/submitted-posts", { state: { fromSubmission: true }, replace: true });

    } catch (err) {
      console.error(err);
      setWarning(err?.response?.data?.error || "Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-5 col-md-10 mb-4 mt-5 sticky-info">
            <ExplanationCard />
          </div>

          <div className="col-lg-6 col-md-10">
            <div className="card shadow p-4 mt-5">
              <h3
                style={{
                  fontSize: "37px",
                  fontFamily: "sans-serif",
                  background: "linear-gradient(to right, #d8cb16, #6d6603)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                className="text-success fw-bold mb-3"
              >
                Share a Destination
              </h3>

              {warning && <div className="alert alert-warning py-2">{warning}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <BasicInfo
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                />

                <ImageUploader
                  images={images}
                  setImages={setImages}
                  warning={warning}
                  setWarning={setWarning}
                />

                <LocationForm location={location} setLocation={setLocation} />

                <CitySelection
                  city={city}
                  setCity={setCity}
                  district={district}
                  setDistrict={setDistrict}
                  showDistrict={showDistrict}
                  setShowDistrict={setShowDistrict}
                  cityDistricts={cityDistricts}
                />

                <div className="d-grid">
                  <button
                    className="btn btn-success btn-lg"
                    type="submit"
                    disabled={submitting || images.length < 4}
                  >
                    {submitting ? "Submitting..." : "Submit Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas />
      <Footer />
    </>
  );
}

export default UserPost;
