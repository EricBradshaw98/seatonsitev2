import React from 'react';
import '../styles/Gallery.scss'; // Import your CSS file for styling

function Gallery({ galleryData, onClick, dispatch }) {
  const handleClick = () => {
    console.log("Clicked gallery number:", galleryData.id);
    onClick();
  };
  return (
    <div className="gallerycomponent" onClick={handleClick}>
      <div className="image-container">
        <img src={galleryData.imageSrc} alt="Gallery Image" className="gallery-image" />
      </div>
      <div className="title-container">
        <div className="title-rectangle">
          <p className="title-text">{galleryData.title}</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;