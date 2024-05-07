import React from 'react';
import PhotoList from '../components/PhotoList';


import '../styles/PhotoDetailsModal.scss'
import closeSymbol from '../assets/closeSymbol.svg';

const PhotoDetailsModal = ({state, dispatch, closeModalPhoto, modalPhoto}) => {
 

  




  return (
    <div className="photo-details-modal">
      <button onClick={closeModalPhoto} className="photo-details-modal__close-button">
        <img src={closeSymbol} alt="close symbol" />
      </button>
      <section className="photo-details-modal__image-container">
        <img className="photo-details-modal__image" src={modalPhoto.url} alt="Photo" />
      </section>
    </div>
  );
};

export default PhotoDetailsModal;

//<img  className="photo-list__image" src={props.photos.urls.regular} alt="Photo" />