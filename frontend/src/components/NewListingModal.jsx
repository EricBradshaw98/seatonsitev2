import React from 'react';
import axios from 'axios'; // Import Axios
import '../styles/NewListingModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie'; // Import the universal-cookie library
import { jwtDecode } from 'jwt-decode';

const NewListingModal = ({ onClose }) => {
  const cookies = new Cookies(); 
  const token = cookies.get('token');
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userId;
  const user_email = decodedToken.userEmail;

  console.log('user_id:', user_id); // Log user_id
  console.log('user_email:', user_email)

  const closeModal = () => {
    onClose(); 
    console.log('user_id:', user_id); // Log user_id
  console.log('user_email:', user_email)
  console.log('decodedtoken:', decodedToken)
    // Call onClose function passed from parent component to close the modal
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Gather form data
    const formData = new FormData(event.target);
    // Append user_id and user_email to form data
    
    try {
      // Make a POST request to your backend route
      const response = await axios.post('/listings', formData);
      // Handle the response if needed
      console.log('Response:', formData);
      console.log("useremail",user_email )
      // Close modal or show success message
      closeModal();
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      // Show error message to the user
    }
  };

  return (
    <div className="new-listing-modal">
      <div className="new-listing-modal__header">
        <button onClick={closeModal} className="new-listing-modal__close-button">
          <img src={closeSymbol} alt="close symbol" />
        </button>
        <h2>Add New Listing</h2>
      </div>
      <div className="new-listing-modal__content">
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="name" // Add name attribute to each input
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            required
            name="price" // Add name attribute to each input
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
            name="description" // Add name attribute to each input
          />
          {/* Hidden input field to store user_id */}
          <input type="hidden" name="user_id" value={user_id} />
          {/* Hidden input field to store user_email */}
          <input type="hidden" name="user_email" value={user_email} />
          {/* Replace the following button with your image uploader */}
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
          >
            Upload Image
            <input type="file" name="image" hidden /> {/* Add name attribute */}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            margin="normal"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewListingModal;

