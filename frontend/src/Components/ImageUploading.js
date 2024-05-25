
import React, { useState, useEffect } from 'react';
import './ImageUploading.css'; // Import the CSS file
import Navbar from "./Navbar";
import jsPDF from 'jspdf';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisResultt, setAnalysisResultt] = useState(null);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [showCrackedImages, setShowCrackedImages] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  const fetchImagesFromFolder = async () => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.get('http://127.0.0.1:5000/images');
      setImages(response.data);
      const responsee = await axios.post('http://127.0.0.1:5000/analyze_image_summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setRecommendations(responsee.data.repair_recommendations);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImagesFromFolder();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        setImageName(selectedFile.name);
        setFile(selectedFile);
        setShowDetails(true);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Image size must be less than 2MB');
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://127.0.0.1:5000/process_image', formData);
        setAnalysisResult(response.data);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Crack Analysis Report", 10, 10);

    if (analysisResult && analysisResult.cracks === "YES") {
      const crackDetails = analysisResult.analysis_text;
      const lines = doc.splitTextToSize(crackDetails, 180);
      doc.text(lines, 10, 30);
    } else {
      doc.text("No cracks detected.", 10, 30);
    }

    doc.save("crack_analysis_report.pdf");
  };

  const handleShowCrackedImages = () => {
    setShowCrackedImages(true);
  };

  const handleSeeReport = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://127.0.0.1:5000/analyze_image_summary', formData);
        setAnalysisResultt(response.data);
        setShowCrackedImages(true); // Show cracked images after seeing the report
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="image-upload-container">
        <div className="right-section">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <div className="img-area" data-img={imageName}>
            {imageUrl ? <img src={imageUrl} alt="Uploaded" /> : (
              <>
                <i className='bx bxs-cloud-upload icon'></i>
                <h3>Upload Image</h3>
                <p>Image size must be less than <span>2MB</span></p>
              </>
            )}
          </div>
          {!showDetails && (
            <button className="select-image" onClick={() => document.getElementById('fileInput').click()}>
              Select Image
            </button>
          )}
          {showDetails && (
            <button className="upload-image" onClick={handleImageUpload}>
              Submit
            </button>
          )}
        </div>
        {showDetails && (
          <div className="left-section">
            <div className="lined-box">
              <div className="content">
                <h4>Image Details</h4>
                {analysisResult ? (
                  <>
                    <p>Is crack present: {analysisResult.cracks}</p>
                    <p>Number of cracks: {analysisResult.cl}</p>
                    <img src={`data:image/png;base64,${analysisResult.image_data}`} alt="Processed" />
                    <button className="download-pdf" onClick={handlePdfDownload}>
                      Download PDF
                    </button>
                    <button className="see-report" onClick={handleSeeReport}>
                      See Report
                    </button>
                  </>
                ) : (
                  <p>Analyzing image...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {analysisResultt && (
        <div className="recommendations">
          <h2>Repair Recommendations:</h2>
          <p>{analysisResultt.repair_recommendations}</p>
        </div>
      )}
      {showCrackedImages && (
        <div className="image-container">
          {images.map((imageName, index) => (
            <div key={index} className="image-item">
              <img src={`http://127.0.0.1:5000/images/${imageName}`} alt={`Image ${index}`} className="image" />
              {analysisResultt && (
                <div className="recommendations">
                  <h2>Repair Recommendations:</h2>
                  <p>{analysisResultt.repair_recommendations}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <footer className="footer">
      </footer>
    </>
  );
};

export default ImageUpload;
