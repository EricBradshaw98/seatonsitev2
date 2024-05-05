import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import './App.css';
import "./styles/app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/login";
import useApplicationData from './hooks/useApplicationData';
import SignUp from "./pages/RegistrationPage";
import Admin from "./pages/admin";
import Users from "./pages/users";
import Galleries from "./pages/galleries";
import Listings from "./pages/listings";
import Photos from "./pages/photos";
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the compiled CSS file
import PhotoViewer from "./components/PhotoCarousel";
import Banner from "./components/Banner"
import MyCalendar from "./components/Calendar";
import MapContainer from './components/mapContainer';
import useGoogleMapsApiKey from './hooks/useGoogleApi';
import WeatherWidget from './components/WeatherWidget';
import Modal from './components/Modal'
import AboutBanner from './components/aboutBanner'
import ContactPage from './pages/contactpage';
import AboutUsPage from './pages/aboutUs'
import WeatherPage from './pages/weatherPage'
import PostPage from './pages/PostPage'
import Cookies from 'universal-cookie'

function App() {


  const { state, setEmail, setPassword, dispatch, setDescription } = useApplicationData();
  

  return (
    <Router>
      <Navbar dispatch={dispatch} state={state} />
      <Routes>
        <Route path="/" element={<HomePage state={state} dispatch={dispatch} />} />
        <Route path="/protected" element={<Users state={state} />} />
        <Route path="/club" element={<PostPage state={state} posts={state.posts} />} />
        <Route path="/contact" element={<ContactPage state={state} />} />
        <Route path="/galleries" element={<Galleries state={state} dispatch={dispatch} />} />
        <Route path="/weather" element={<WeatherPage weather={state.weather} dispatch={dispatch} />} />
        <Route path="/aboutus" element={<AboutUsPage state={state} />} />
        <Route path="/listings" element={<Listings state={state} dispatch={dispatch} />} />
        <Route path="/photos" element={<Photos state={state} dispatch={dispatch} />} />
        <Route path="/admin" element={<Admin state={state} dispatch={dispatch} setDescription={setDescription} />} />
        <Route path="/sign-up" element={<SignUp state={state} />} />
        <Route
          path="/login"
          element={
            <LoginPage
              dispatch={dispatch}
              state={state}
              email={state.email}
              password={state.password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </Router>
  );
}

const HomePage = ({ state, dispatch, apiKey }) => {

  const cookies = new Cookies();
  const token = cookies.get('token');

  const eventData = state.eventData.map(event => ({
    title: event.event_name,
    description: 'Description for Event 1',
    start: new Date(event.event_start),
    end: new Date(event.event_end),
  }));

  const googleMapsApiKey = useGoogleMapsApiKey();
  console.log(googleMapsApiKey)

  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 43.979815, // Example latitude
    lng: -79.143670, // Example longitude
  };

  const zoom = 15; // Example zoom level

  return (
    <>
     {!token && <Modal />}
      <PhotoViewer />
      <Banner />
      <MyCalendar events={eventData} dispatch={dispatch} />
      <MapContainer mapStyles={mapStyles} center={center} zoom={zoom} apiKey={googleMapsApiKey} />
      <WeatherWidget weather={state.weather} dispatch={dispatch} />
      <AboutBanner/>
    </>
  );
};

export default App;
