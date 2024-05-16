import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PostPage.scss';
import windgust from '../assets/wind_gust_air-512.webp'
import tomorrow from '../assets/tomorrow.png'
import PostItem from '../components/PostItem';
import AnnounceBanner from '../components/AnnounceBanner'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const PostPage = ({ posts }) => {
  

 
  if (!posts) {
    return <div>Loading...</div>; // You can add a loading indicator here
  }

  return (

    <ThemeProvider theme={defaultTheme}>
      
      <Box
        sx={{
          height: '100%',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
          
        }}
      >
       
    <div className="entire">
      
    <div className="posts-container">
   
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
    
    
      </Box>
    </ThemeProvider>);

}

export default PostPage;