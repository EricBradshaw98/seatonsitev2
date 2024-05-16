import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../styles/calendar.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        style={{ height: '100%', width: '95%' }}
      />
    </div>
  );
}

export default MyCalendar;