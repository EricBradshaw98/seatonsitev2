import "../styles/listings.scss";
import ListingItem from "../components/ListingItem";
import React, { useState } from "react";
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import { jwtDecode } from 'jwt-decode';
import NewListingModal from "../components/NewListingModal";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const Listings = ({ state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const token = cookies.get('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const user_id = decodedToken ? decodedToken.userId : null;
 



  const handleAddListing = () => {
    setIsModalOpen(true); // Open the modal when Add Listing button is clicked
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };





  return (
    <div className="page-container">
      <div className="header">
        <div className="emptylistingdiv"></div>
        {decodedToken && (
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#6F9600', width: '80%', marginBottom: '2vh' }} // Green color, 80% width, and 2vh bottom margin
            onClick={handleAddListing}
          >
            Add Listing
          </Button>
        )} {/* Button to add a new listing */}
        {state.listingData.map((listing, index) => (
          <ListingItem className="listingitem" key={index} listing={listing} />
        ))}
        <div className="vertical-bar">
        <h3>Classifieds</h3>
        <p>Ads will be active for 30 days after which the post will expire.</p>
        
        <p>Ads are only visible to club members.</p>
        
        <p>This page is provided as a convenience to club members. It is not moderated.</p>
      </div>
        
      </div>
      
      
      
      {/* Modal component (conditional rendering based on isModalOpen state) */}
      {isModalOpen && (
        <div className="modal">
          {/* Render NewListingModal component */}
          <NewListingModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default Listings;