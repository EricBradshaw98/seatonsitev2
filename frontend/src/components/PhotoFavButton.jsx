import React, { useCallback, useState } from 'react';

import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

function PhotoFavButton(props) {
  const [likes, setLikes] = useState(false);

  
  const toggleFavorite = () => {

    let favourites = props.favouritePhotos;

    let like = false  

    if (favourites.includes(props.id)) { 

      
      const index = favourites.indexOf(props.id);
      if (index > -1) { // only splice array when item is found
        favourites.splice(index, 1); // 2nd parameter means remove one item only
      }

    } else {
      favourites.push(props.id);
      like = true
    }

    props.setFavouritePhotos([...favourites]);
    setLikes(like);
    
  };

  return (
    <div className="photo-list__fav-icon" onClick={toggleFavorite}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={likes} />
      </div>
      <div className="photo-list__likes">{likes}</div>
    </div>
  );
}

export default PhotoFavButton;