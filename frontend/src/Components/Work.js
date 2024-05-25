import React from "react";
import ImageAnalysis from "../Assets/image-analysis1.png";
import Solution from "../Assets/solution.png";
import Maintenance from "../Assets/maintenance.png";

const Work = () => {
  const workInfoData = [
    {
      image: ImageAnalysis,
      title: "Image Analysis",
      text: "Upload an image for accurate analysis.",
    },
    {
      image: Solution,
      title: "Solution Assistance",
      text: "Need repair solutions? Simply provide an image.",
    },
    {
      image: Maintenance,
      title: "Enhanced Maintenance",
      text: "Experience fast and efficient maintenance procedures.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Explore the simplified process of our aircraft maintenance solution. From analysis to recommendation, discover how we ensure safety and efficiency.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img className="image1" src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
