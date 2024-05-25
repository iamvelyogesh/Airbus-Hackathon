import React, { useState } from 'react';
import './ImageViewer.css'; // Import the CSS file

const ImageViewer = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 14;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Check if images prop is defined
  if (!images) {
    return null; // Return null or any fallback UI if images is undefined
  }

  return (
    <div className="image-viewer1">
      {images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage).map((image, index) => (
        <div key={index} className="image-container1">
          <img src="https://via.placeholder.com/150" alt={`Image ${index}`} />
          <p>{image.dimensions}</p>
        </div>
      ))}
      {images.length > (currentPage + 1) * imagesPerPage && (
        <button className="secondary-button1" onClick={nextPage}>Next</button>
      )}
      {currentPage > 0 && (
        <button className="secondary-button1" onClick={prevPage}>Previous</button>
      )}
    </div>
  );
};

export default ImageViewer;
