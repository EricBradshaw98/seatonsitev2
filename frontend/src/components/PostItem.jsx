import React from 'react';
import '../styles/PostPage.scss';


const PostItem = ({photo,
  name,
  description,
  first_name,
  last_name,
  username,
  date}) => {


  
  return (
    <div>
    <div className="post-container">
    <div className="post-info">
    <h2>{name}</h2>
    <p>{description}</p>
    <p>
      Author: {first_name} {last_name} (
      {username})
    </p>
    
    <p>Date Updated: {new Date(date).toLocaleString()}</p>
    </div>
  
  <img src={photo} alt="Post" className="post-photo" />
  </div>
  </div>
);
};






export default PostItem;