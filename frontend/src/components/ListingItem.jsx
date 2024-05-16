import React from 'react';
import "../styles/listingitem.scss";

function Listing({ listing }) {
  const { name, email, imageurl, price, description, createdAt, updatedAt } = listing;

  return (
    <div className="listing">
      <div className="listing-image">
        <img src={`/uploads/${imageurl}`} alt={name} />
      </div>
      <div className="listing-details">
        <div className="listing-name">{name}</div>
        <div className="listing-info">
          <p>Description: {description}</p>
          <p>Price: {price}</p>
          <p>Contact Info: {email}</p>
          <p>Created At: {createdAt}</p>
          <p>Updated At: {updatedAt}</p>
        </div>
      </div>
    </div>
  );
}

export default Listing;
