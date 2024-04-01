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
  searchQuery: ""
};

const ACTIONS = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_LISTING_DATA: "SET_LISTING_DATA",
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_EVENT_DATA: "SET_EVENT_DATA",
  SET_LOGIN_STATE: "SET_LOGIN_STATE",
  SET_EMAIL_STATE: "SET_EMAIL_STATE",
  SET_PASSWORD_STATE: "SET_PASSWORD_STATE",
  SET_QUERY_STATE: "SET_QUERY_STATE"
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
  
  

  return {
    dispatch,
    state,
    email,
    setEmail,
    password,
    setPassword
    
  };
};

export default useApplicationData;
