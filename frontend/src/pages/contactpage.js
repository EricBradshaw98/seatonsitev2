import React from "react";
import YoutubeEmbed from "../components/YoutubeEmbed";
import photosStyles from "../styles/photos.module.scss"; // Import SCSS module
import MyCalendar from "../components/Calendar";
import EmailForm from "../components/EmailForm"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const ContactPage = ({ state, dispatch }) => {

 
  const defaultTheme = createTheme();


  return (

    <ThemeProvider theme={defaultTheme}>
      
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          flexGrow: 1,
          
        }}
      >
    <div>
      <EmailForm/>
    </div>
    </Box>
    </ThemeProvider>)

};

export default ContactPage;
