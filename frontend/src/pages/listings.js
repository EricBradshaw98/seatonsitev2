

import React from "react";

const Listings = ({ state }) => {
  return (
    <div>
      <h1>Listings</h1>
      {state.listingData.map(listing => (
        <div key={listing.id}>
          <h2>{listing.name}</h2>
          <img src={listing.imageurl} alt={listing.name} />
          <p>Price: ${listing.price}</p>
          <p>Description: {listing.description}</p>
          <p>User ID: {listing.user_id}</p>
          <p>Created At: {listing.created_at}</p>
          <p>Updated At: {listing.updated_at}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;