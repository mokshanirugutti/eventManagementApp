import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button onClick={() => {/* Join event logic */}}>Join Event</button>
        </div>
      ))}
    </div>
  );
};

export default EventList; 