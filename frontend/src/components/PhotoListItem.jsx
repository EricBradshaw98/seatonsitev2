import React from "react";
import "../styles/PhotoFavButton.scss";
import "../styles/PhotoListItem.scss";
import PhotoFavButton from './PhotoFavButton';
import FavIcon from './FavIcon';
import "../styles/TopicList.scss";
import PhotoDetailsModal from "../components/PhotoDetailsModal";


const PhotoListItem = ({ photo, setModalPhoto }) => {
  return (
    <section className="photo-list__item">
      <img onClick={()=>setModalPhoto(photo)} className="photo-list__image" src={photo.url} alt="Photo" />
    </section>
  );
};

export default PhotoListItem;
