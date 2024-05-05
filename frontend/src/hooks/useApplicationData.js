import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();





const initialState = {
  userData: [],
  listingData: [],
  photoData: [],
  eventData: [],
  email: "",
  password: "",
  searchQuery: "",
  description: "",
  eventName: "",
  eventStart: "",
  eventEnd: "",
  adminPage: "Posts",
  postDescription: "",
  postName: "",
  postPhoto: "",
  login: "",
  weather: [],
  galleries: [],
  posts: [],
  gallerystate:""
};

const ACTIONS = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_LISTING_DATA: "SET_LISTING_DATA",
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_EVENT_DATA: "SET_EVENT_DATA",
  SET_LOGIN_STATE: "SET_LOGIN_STATE",
  SET_EMAIL_STATE: "SET_EMAIL_STATE",
  SET_PASSWORD_STATE: "SET_PASSWORD_STATE",
  SET_QUERY_STATE: "SET_QUERY_STATE",
  SET_DESCRIPTION_STATE: "SET_DESCRIPTION_STATE",
  SET_EVENT_NAME_STATE: "SET_EVENT_NAME_STATE",
  SET_EVENT_START_STATE: "SET_EVENT_START_STATE",
  SET_EVENT_END_STATE: "SET_EVENT_END_STATE",
  SET_ADMIN_PAGE_STATE: "SET_ADMIN_PAGE_STATE",
  SET_POSTDESCRIPTION_STATE: "SET_POSTDESCRIPTION_STATE",
  SET_POST_NAME_STATE: "SET_POST_NAME_STATE",
  SET_POST_PHOTO_STATE: "SET_POST_PHOTO_STATE",
  SET_WEATHER_DATA: "SET_WEATHER_DATA",
  SET_GALLERY_STATE: "SET_GALLERY_STATE",
  SET_POSTS_DATA: "SET_POSTS_DATA",
  SET_GALLERYSTATE_DATA: "SET_GALLERYSTATE_DATA",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_DATA:
      return { ...state, userData: action.payload };
    case ACTIONS.SET_LISTING_DATA: 
      return { ...state, listingData: action.payload }; 
    case ACTIONS.SET_PHOTO_DATA: 
      return { ...state, photoData: action.payload }; 
      case ACTIONS.SET_EVENT_DATA: 
      return { ...state, eventData: action.payload };
    case ACTIONS.SET_LOGIN_STATE:
      return { ...state, login: !state.login };
    case ACTIONS.SET_EMAIL_STATE:
      return { ...state, email: action.payload }; 
    case ACTIONS.SET_PASSWORD_STATE:
      return { ...state, password: action.payload }; 
    case ACTIONS.SET_QUERY_STATE:
      return { ...state, searchQuery: action.payload }; 
      case ACTIONS.SET_DESCRIPTION_STATE:
      return { ...state, description: action.payload }; 
      case ACTIONS.SET_EVENT_NAME_STATE:
      return { ...state, eventName: action.payload };
      case ACTIONS.SET_EVENT_START_STATE:
      return { ...state, eventStart: action.payload };
      case ACTIONS.SET_EVENT_END_STATE:
      return { ...state, eventEnd: action.payload };
      case ACTIONS.SET_ADMIN_PAGE_STATE:
      return { ...state, adminPage: action.payload };
      case ACTIONS.SET_POSTDESCRIPTION_STATE:
      return { ...state, postDescription: action.payload };
      case ACTIONS.SET_POST_NAME_STATE:
      return { ...state, postName: action.payload };
      case ACTIONS.SET_POST_PHOTO_STATE:
      return { ...state, postPhoto: action.payload };
      case ACTIONS.SET_WEATHER_DATA:
      return { ...state, weather: action.payload };
      case ACTIONS.SET_GALLERY_STATE:
      return { ...state, galleries: action.payload };
      case ACTIONS.SET_POSTS_DATA:
      return { ...state,posts: action.payload };
      case ACTIONS.SET_GALLERYSTATE_DATA:
      return { ...state, gallerystate: action.payload };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users'); 
        dispatch({ type: ACTIONS.SET_USER_DATA, payload: response.data });
      } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, []);


  useEffect(() => {
    
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get('/galleries'); 
        dispatch({ type: ACTIONS.SET_GALLERY_STATE, payload: response.data });
        console.log(response)
      } catch (error) {
        // Handle error
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleryData(); // Call fetchUserData function
  }, []);
  

  useEffect(() => {
    
    const fetchListingData = async () => {
      try {
        const response = await axios.get('/listings'); 
        dispatch({ type: ACTIONS.SET_LISTING_DATA, payload: response.data });
      } catch (error) {
        // Handle error
        console.error('Error fetching Listing data:', error);
      }
    };

    fetchListingData(); // Call fetchUserData function
  }, []);

  useEffect(() => {
    
    const fetchPhotoData = async () => {
      try {
        const response = await axios.get('/photos'); 
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: response.data });
      } catch (error) {
        // Handle error
        console.error('Error fetching Photo data:', error);
      }
    };

    fetchPhotoData(); // Call fetchUserData function
  }, []);

  useEffect(() => {
    
    const fetchEventData = async () => {
      try {
        const response = await axios.get('/events'); 
        dispatch({ type: ACTIONS.SET_EVENT_DATA, payload: response.data });
      } catch (error) {
        // Handle error
        console.error('Error fetching Event data:', error);
      }
    };

    fetchEventData(); // Call fetchUserData function
  }, []);


  useEffect(() => {
    
    const fetchPostData = async () => {
      try {
        const response = await axios.get('/posts'); 
        dispatch({ type: ACTIONS.SET_POSTS_DATA, payload: response.data });
      } catch (error) {
        // Handle error
        console.error('Error fetching Event data:', error);
      }
    };

    fetchPostData(); // Call fetchUserData function
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
       
        await axios.post('/api/weather');
          
          setTimeout(async () => {
            const response = await axios.get('/api/weatherupdated');
            dispatch({ type: 'SET_WEATHER_DATA', payload: response.data });
            // Store the fetched data in state
          }, 1000);
        
      } catch (error) {
        // Handle error
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(); // Call the fetchWeatherData function
  }, []);


  const setDescription = (description) => {
    dispatch({ type: ACTIONS.SET_DESCRIPTION_STATE, payload: description }); // Dispatch action to set description
  };
  const setEventName = (eventName) => {
    dispatch({ type: ACTIONS.SET_EVENT_NAME_STATE, payload: eventName }); // Dispatch action to set description
  };
  
  

  return {
    dispatch,
    state,
    email,
    setEmail,
    password,
    setPassword,
    setDescription
    
  };
};

export default useApplicationData;
