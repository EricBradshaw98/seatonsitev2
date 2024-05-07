import React, { useEffect } from "react";
import PhotoListItem from './PhotoListItem';
import "../styles/PhotoList.scss";
import axios from "axios";

const PhotoList = ({ state, dispatch, setModalPhoto, closeModalPhoto }) => {
  


  const photoItems = state.photoData.map((photo) => (
    <PhotoListItem
      key={photo.id}
      photo={photo}
      setModalPhoto={setModalPhoto}
      closeModalPhoto={closeModalPhoto}
      
    />
  ));

  return (

    
    <ul className="photo-list">
      <div className="empty" ></div>
      {photoItems}
    </ul>
  );
};

export default PhotoList;