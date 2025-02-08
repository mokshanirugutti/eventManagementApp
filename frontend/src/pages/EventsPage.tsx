import EventComponent from '@/components/EventComponent';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import fetchAllEvents from '@/hooks/fetchAllEvents';
import { Event } from '@/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';



const EventsPage: React.FC = () => {
  const {user} = useUser();
  
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetchAllEvents();
      
      if (response && response.data) {
        setEvents(response.data); 
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='pagePadding min-h-screen'>
      <h1 className='text-3xl text-center my-10'>Events</h1>
      

      {user && <p className='text-sm text-gray-500 text-center'> hello {user.username}
        <Link to={'/create-event'}>
          <Button variant="ghost">Create event</Button>
        </Link>
        </p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {events.map(event => (
            <EventComponent id={event._id} title={event.title} date={new Date(event.date).toLocaleDateString()} creator={event.creator.username} description={event.description} key={event._id}/>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;