import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  // Define your events list here
 
  return (
    
      <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #ccc', padding: '20px' }}>
        <Calendar
          localizer={localizer}
          events={ events }
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()} // Set defaultDate to the current date
          style={{ height: 700, width: '80%' }} // Note: '80%' is a string
        />
      </div>
    );
  }

export default MyCalendar;
