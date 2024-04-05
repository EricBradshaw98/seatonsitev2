import { useState, useEffect } from 'react';

const useGoogleMapsApiKey = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch('/api/googlemap') // Replace with your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Google Maps API key');
        }
        return response.json();
      })
      .then(data => {
        console.log('Google Maps API key:', data.apiKey); // Log the fetched API key
        setApiKey(data.apiKey);
      })
      .catch(error => console.error('Error fetching Google Maps API key:', error));
  }, []);

  return apiKey;
};

export default useGoogleMapsApiKey;

