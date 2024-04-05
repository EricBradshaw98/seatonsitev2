import React from "react";
import YoutubeEmbed from "../components/YoutubeEmbed";
import photosStyles from "../styles/photos.module.scss"; // Import SCSS module
import MyCalendar from "../components/Calendar";


const Galleries = ({ state, dispatch }) => {
  const handleSearchChange = (event) => {
    dispatch({ type: "SET_QUERY_STATE", payload: event.target.value });
  };
 

  const eventData = state.eventData.map(event => ({
    title: event.event_name,
    description: 'Description for Event 1',
    start: new Date(event.event_start),
    end: new Date(event.event_end),
  }));
  
 
  
  

  const filteredPhotos = state.photoData.filter(photo =>
    photo.name.toLowerCase().includes(state.searchQuery ? state.searchQuery.toLowerCase() : "")
  );

  return (
    <div>
      <h1>Photos</h1>
      <input
        type="text"
        placeholder="Search photos..."
        value={state.searchQuery}
        onChange={handleSearchChange}
        className={photosStyles.searchBar} // Apply SCSS module class
      />
      {filteredPhotos.map(photo => (
        <div key={photo.id} className={photosStyles.photoContainer}> {/* Apply SCSS module class */}
          <h2>{photo.name}</h2>
          <img src={photo.url} alt={photo.name} />
          <p>Description: {photo.description}</p>
          <p>Created At: {photo.created_at}</p>
          <p>Updated At: {photo.updated_at}</p>
        </div>
      ))}
      <YoutubeEmbed embedId="WlmY53ksBY4?si=VDrxoUHKu43fsocO" />
      <MyCalendar events={eventData}  />
    </div>
  );
};

export default Galleries;

