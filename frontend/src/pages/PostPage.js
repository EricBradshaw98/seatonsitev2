import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PostPage.scss';
import windgust from '../assets/wind_gust_air-512.webp'
import tomorrow from '../assets/tomorrow.png'
import PostItem from '../components/PostItem';
import AnnounceBanner from '../components/AnnounceBanner'


const PostPage = ({ posts }) => {
  

 
  if (!posts) {
    return <div>Loading...</div>; // You can add a loading indicator here
  }

  return (
    <div className="entire">
      
    <div className="posts-container">
    <AnnounceBanner/>
      {posts.map(post => (
        posts &&
        <PostItem
          key={post.id}
          photo={post.photo}
          name={post.name}
          description={post.description}
          first_name={post.author_first_name}
          last_name={post.author_last_name}
          username={post.author_username}
          date={post.date_updated}
        />
      ))}
      
    </div>
    
    </div>
  );
};

export default PostPage;