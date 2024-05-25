import React from "react";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import About from "./About";
import { FiArrowRight } from "react-icons/fi";
import Work from "./Work";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  const nav = useNavigate();
  
  const toUpload=()=>{
    nav("/aero/ImageUpload");
  }
  return (
    <div id="home-section" className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            AI-Powered Aircraft Damage and Fault Detection System
          </h1>
          <p className="primary-text">
            Leveraging advanced imaging and analysis techniques to ensure the safety, reliability, and operational continuity of aircraft through meticulous damage assessment and fault detection.
          </p>
          <div className="button-horizontal">
          <button className="secondary-button" onClick={toUpload}>
            Upload Image <FiArrowRight />
          </button>
          <button className="secondary-button">
            Start Chat <FiArrowRight />
          </button>
          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>
      <About/>
      <Work/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
