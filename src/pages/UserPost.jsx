import React, { useEffect, useState } from "react";
import Navbar from "./PublicpagesComponents/Navbar";
import Footer from "./PublicpagesComponents/Footer";
import "../assets/custom_css3.css";
import ImageUploader from "./PublicpagesComponents/FormpageComponents/ImageFunctionality";
import BasicInfo from "./PublicpagesComponents/FormpageComponents/BasicInfo";
import CitySelection from "./PublicpagesComponents/FormpageComponents/CitySelection";
import LocationForm from "./PublicpagesComponents/FormpageComponents/LocationForm";
import ExplanationCard from "./PublicpagesComponents/FormpageComponents/ExplanationCard";
import { createPost } from "../api/post"; // ✅ using backend
import Offcanvas from "./PublicpagesComponents/Offcanvas";
import { useNavigate } from "react-router-dom";

function UserPost() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");           // kept for UI only
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");     // "lat,lng" e.g. "36.1909,44.0069"
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [showDistrict, setShowDistrict] = useState(false);
  const [images, setImages] = useState([]);         // File[]
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const cityDistricts = {
    Erbil: ["Soran", "Shaqlawa", "Mergasor", "Koya"],
    Sulaimani: ["Chamchamal", "Tasluja", "Penjwen", "Qaladze"],
    Duhok: ["Akre", "Zakho", "Amadiya", "Simele"],
    Halabja: ["Byara", "Tawella"],
    Kirkuk: ["Daquq", "Tuz Khurmatu"],
  };

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

    // Basic checks
  // Support both shapes: [{file, previewUrl}] or [File]
 const files = images.map((it) => (it?.file ? it.file : it)).filter(Boolean);
 if (files.length < 4) {
      setWarning("Please upload at least 4 images.");
      return;
    }
    if (!name || !email || !city || !district || !location) {
      setWarning("Fill all required fields (name, email, city, district, location, 4+ images).");
      return;
    }

    // Optional minimal lat,lng format check
    const locOk = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(location);
    if (!locOk) {
      setWarning("Location must be in 'lat,lng' format, e.g. 36.1909,44.0069");
      return;
    }

    setWarning("");
    setSubmitting(true);
    try {
     await createPost({ name, email, city, district, location }, files);
      // Clear the form
      setName(""); setPhone(""); setEmail(""); setLocation("");
      setCity(""); setDistrict(""); setShowDistrict(false);
      setImages([]);

      navigate("/submitted-posts");
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

              {warning && (
                <div className="alert alert-warning py-2">{warning}</div>
              )}
{/* <p className="text-muted">Debug: images selected = {images?.length ?? 0}</p> */}


              <form onSubmit={handleSubmit}>
                <BasicInfo
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
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
                <button className="btn btn-success btn-lg" type="submit" disabled={submitting || images.length < 4}>
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
