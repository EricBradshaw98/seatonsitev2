import React, { useState } from 'react';

const ImageUpload = ({ dispatch, state }) => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      // Dispatch action to update state with the image data
      dispatch({ type: 'SET_POST_PHOTO_STATE', payload: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      // Dispatch action to update state with the image data
      dispatch({ type: 'SET_POST_PHOTO_STATE', payload: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {image ? (
        <img
          src={image}
          alt="Dropped"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
