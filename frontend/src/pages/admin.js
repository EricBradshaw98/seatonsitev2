import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YoutubeEmbed from "../components/YoutubeEmbed";
import photosStyles from "../styles/photos.module.scss"; // Import SCSS module
import MyCalendar from "../components/Calendar";
import AdminEvent from "../components/AdminEvent";
import Cookies from 'universal-cookie'; // Import the universal-cookie library
import { jwtDecode } from 'jwt-decode';





const Admin = ({ state, dispatch, setDescription }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  useEffect(() => {
    const cookies = new Cookies(); // Create a new instance of universal-cookie
    const token = cookies.get('token'); // Get token from cookies

    if (!token) {
      navigate('/login');
      // Redirect to login page if token is not present
    } else {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const response = await fetch(`/users/${decodedToken.userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      navigate('/login');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user object exists and if user is admin
  if (!user || !user.admin) {
    return <div>You do not have permission to access this page.</div>;
  }


  return (
    <div>
     
      
        
      
     
      <AdminEvent state={state} dispatch={dispatch} setDescription={setDescription}   />
    </div>
  );
};

export default Admin;

