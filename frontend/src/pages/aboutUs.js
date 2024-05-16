import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import '../styles/aboutUsPage.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage1 from '../assets/photo-78.jpg'
import backgroundImage2 from '../assets/photo-83.jpg'
import backgroundImage3 from '../assets/photo-94.jpg'
import backgroundImage4 from '../assets/photo-75.jpg'
import backgroundImage5 from '../assets/photo-99.jpg'
import backgroundImage6 from '../assets/photo-82.jpg'
import backgroundImage7 from '../assets/photo-88.jpg'
import backgroundImage8 from '../assets/photo-92.jpg'
import backgroundImage9 from '../assets/photo-77.jpg'


const defaultTheme = createTheme();

const AboutUsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const images = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5, backgroundImage6, backgroundImage7, backgroundImage8, backgroundImage9];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      // Increment the current image index, reset to 0 if it reaches the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(false);
    }, 7500); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const currentImageUrl = images[currentImageIndex];

  return (
<ThemeProvider theme={defaultTheme}>
      
<Box
  sx={{
    minHeight: '400px', // Adjust the minimum height as needed
    height: '100vh',
    backgroundImage: `url(${currentImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1, // Allow the box to grow to fill available space
  }}
>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Box}
          elevation={6}
          square
          width='75%'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(111,150,0, 0.8)', 
    borderRadius: '4px',
    padding: '10px', 
    marginTop: '12vh',
          }}
          
        >
    <div className="about-us-page">
      <div className="about-us-empty"></div>
      <section className="section">
        <h2>WHAT WE FLY</h2>
        <p>You'll see beautiful scale airplanes; nitro, gas, EDF jets and electric helicopters—even drones and micro aircraft. Come out to fly or just come out to watch.</p>
        <p>Want to see more? <Link to="/galleries">Click here</Link> for a look at our photo gallery.</p>
      </section>

      <section className="section">
        <h2>OUR FLYING FIELD</h2>
        <p>The Seaton Valley flying field is located near Claremont, ON, just 30 minutes north of Pickering. Visitors are always welcome to check out the club. Maps and directions to the Seaton Valley model aircraft flying field are in contact us.</p>
        <p>(Seasonal visitation restrictions - Spring and Summer only)</p>
      </section>

      <section className="section">
        <h2>WHY YOU SHOULD JOIN US</h2>
        <p>Seaton Valley RCMC has one of the best RC model aircraft flying fields in the area. You'll have plenty of flying time when you're at the field. We are heli and drone-friendly. Our members are regular guys, always willing to help. Interested?</p>
      </section>
    </div>
    </Grid>
      </Box>
    </ThemeProvider>);
}


export default AboutUsPage;