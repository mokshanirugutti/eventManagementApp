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
  const [loading,setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetchAllEvents();
      
      if (response && response.data) {
        setEvents(response.data); 
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };
  

  return (
    <div className='pagePadding min-h-screen'>
      <h1 className='text-3xl text-center my-10'>Events</h1>
      
      {loading && <p className='text-sm text-center'>Loading events...</p>}
      {user && 
        <div className='flex justify-end px-5'>
        <Link to={'/create-event'}>
          <Button variant="outline" className='bg-foreground/95 text-background '>Create event</Button>
        </Link>
        </div>
        }
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {events.map(event => (
            <EventComponent id={event._id} title={event.title} date={new Date(event.date).toLocaleDateString()} creator={event.creator.username} description={event.description} key={event._id} 
            onDelete={handleDeleteEvent}
            />
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;