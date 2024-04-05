import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = ({ mapStyles, center, zoom, apiKey }) => {
  return (
    <LoadScript
      googleMapsApiKey={'AIzaSyAy6T92y9QiwUBHd6mH9dd4oxrVbHnzaGw'} // Make sure to replace this with your actual API key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={zoom}
      >
        {/* Add any additional components like markers, polygons, etc. here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
