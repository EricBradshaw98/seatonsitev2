import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PhotoViewer.scss'; // Import CSS for styling
import first from '../assets/first.jpg';
import second from '../assets/second.jpg';
import third from '../assets/third.jpg';

const photos = [
  first,
  second,
  third
  // Add more photo URLs as needed
];

const PhotoViewer = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const goToPhoto = (index) => {
    setFade(true); // Activate fade-out transition
    setTimeout(() => {
      setCurrentPhotoIndex(index);
      setFade(false); // Deactivate fade-out transition after a short delay
    }, 500); // Delay matches the transition duration
  };

  const goToPreviousPhoto = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentPhotoIndex((prevIndex) => {
        if (prevIndex === 0) {
          setFade(false); // Fade-out transition should end before changing the index
          return photos.length - 1; // Loop back to the last photo if currently at the first one
        } else {
          setFade(false);
          return prevIndex - 1;
        }
      });
    }, 500); // Delay matches the transition duration
  };

  const goToNextPhoto = () => {

    setFade(true);
    setTimeout(() => {
    setCurrentPhotoIndex((prevIndex) => {
      if (prevIndex === photos.length - 1) {
        setFade(false);
        return 0; // Loop back to the first photo if currently at the last one
      } else {
        setFade(false);
        return prevIndex + 1;
      }
    });
  }, 500);
  };

  return (
    <div className="photo-viewer">
      <img
        src={photos[currentPhotoIndex]}
        alt={`Photo ${currentPhotoIndex + 1}`}
        className={`photo ${fade ? 'fade-out' : ''}`} // Apply fade-out class if fade state is true
        onLoad={() => setFade(false)} // Ensure fade-out class is removed when image finishes loading
      />

      <div className="navigation-bar">
        <button
          className={`nav-button ${fade ? 'fade-out' : ''}`} // Apply fade-out class if fade state is true
          onClick={goToPreviousPhoto}
        >
          &larr;
        </button>
        {photos.map((_, index) => (
          <button
            key={index}
            className={`navigation-button ${currentPhotoIndex === index ? 'active' : ''}`}
            onClick={() => goToPhoto(index)}
          />
        ))}
        <button
          className={`nav-button ${fade ? 'fade-out' : ''}`} // Apply fade-out class if fade state is true
          onClick={goToNextPhoto}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

PhotoViewer.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired // Array of photo URLs
};

export default PhotoViewer;
