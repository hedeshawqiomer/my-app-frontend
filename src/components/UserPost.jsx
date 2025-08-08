import React, { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import "../assets/custom_css3.css";
import ImageUploader from "./Form/ImageFunctionality";
import BasicInfo from "./Form/BasicInfo";
import CitySelection from "./Form/CitySelection";
import LocationForm from "./Form/LocationForm";
import ExplanationCard from "./Form/ExplanationCard";
import { addPost } from "../utills/postStore.js";
import Offcanvas from "./Layouts/Offcanvas";
import { useNavigate } from "react-router-dom";


function UserPost() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [showDistrict, setShowDistrict] = useState(false);
  const [images, setImages] = useState([]);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();


  const cityDistricts = {
    Erbil: ["Soran", "Shaqlawa", "Mergasor", "Koya"],
    Sulaimani: ["Chamchamal", "Tasluja", "Penjwen", "Qaladze"],
    Duhok: ["Akre", "Zakho", "Amadiya", "Simele"],
    Halabja: ["Byara", "Tawella"],
    Kirkuk: ["Daquq", "Hawija", "Riyadh", "Abbasi"]
  };

  useEffect(() => {
    const navbar = document.querySelector("#mainNav");
    const handleScroll = () => {
      if (window.scrollY === 0) {
        navbar?.classList.remove("navbar-shrink");
      } else {
        navbar?.classList.add("navbar-shrink");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Submit clicked!");

    if (images.length < 4) {
      setWarning("Please upload at least 4 images.");
      return;
    }

    setWarning("");

    const newPost = {
      name,
      phone,
      email,
      location,
      city,
      district,
      images: images.map((file) => URL.createObjectURL(file)) // 🔁 PREVIEW URLs
    };

    const savedPost = addPost(newPost);
    console.log("✅ Post saved to localStorage:", savedPost);

    // Clear the form
    setName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setCity("");
    setDistrict("");
    setShowDistrict(false);
    setImages([]);

    navigate("/SubmittedPosts");

  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-5 col-md-10 mb-4 sticky-info">
            <ExplanationCard />
          </div>
          <div className="col-lg-6 col-md-10">
            <div className="card shadow p-4 mt-5">
              <h3 style={{
          fontSize: "37px",
          fontFamily: "sans-serif",
          background: "linear-gradient(to right, #d8cb16, #6d6603)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}className="text-success fw-bold mb-3">Share a Destination</h3>
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
                  <button className="btn btn-success btn-lg" type="submit">
                    Submit Post
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
