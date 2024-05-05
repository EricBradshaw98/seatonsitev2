import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gallery from "../components/Gallery"
import axios from "axios";
import PhotoViewer from "../components/PhotoCarousel";


const Galleries = ({ state, dispatch }) => {

 
  const navigate = useNavigate();



  useEffect(() => {
    const fetchPhotos = async (galleryId) => {
      try {
        const response = await axios.get(`/photos/${galleryId}`);
        dispatch({ type: "SET_PHOTO_DATA", payload: response.data });
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos(state.gallerystate);
  }, [state.gallerystate, dispatch]);

  const galleryComponents = state.galleries.map(gallery => (
    <Gallery
      key={gallery.id} // Assuming there's an id for each gallery
      galleryData={{
        imageSrc: gallery.image,
        title: gallery.name // Assuming the name is the title
      }}
      onClick={() => {
        console.log("Clicked gallery number:", gallery.id);
        dispatch({ type: "SET_GALLERYSTATE_DATA", payload: gallery.id });
        navigate(`/galleries/${gallery.id}`);
      }}
    />
  ));

  return (
    <div className="entiregallery">
    <div className="gallerycontainer">
    
      {galleryComponents}
    
    </div>
    
    </div>
  );
};

export default Galleries;

