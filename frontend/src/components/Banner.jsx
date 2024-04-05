import React from 'react';
import '../styles/Banner.scss'; // Import CSS for styling

const Banner = () => {
  return (
    <div className="banner">
      <h1 className="banner-header">Welcome to Our Website</h1>
      <h2 className="sub-header">Discover Amazing Things Here</h2>
      <p className="banner-paragraph">The Seaton Valley Radio Control Model Club has been supporting model flying since 1983. If you are a beginner looking to get into the hobby we are happy to give advice on all aspects of selecting, setting up and flying. We also have instructors who will help you all the way through to attaining flying proficiency</p>
    </div>
  );
};

export default Banner;
