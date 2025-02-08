import { EventComponentProps } from '@/types'
import React from 'react'
import { useNavigate } from 'react-router';


const EventComponent : React.FC<EventComponentProps> = ({id, title, date, creator,description}) => {

  const navigate = useNavigate();

  const handleJoinEvent = () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
      alert('You must be logged in to join an event.');
      return;
    }

    // Navigate to event room with eventId and token as query params
    navigate(`/event/${id}`, { state: { token,title,description,creator,id } });
  };


  return (
    <div className='border px-5 py-2 mx-auto w-72 rounded-md my-2'>
        <div className='flex gap-2 items-center justify-between'>
            <div>
                <h2 className='text-2xl '>{title}</h2>
                <p className='text-sm text-gray'>{creator}</p>
            </div>
        <p className='text-sm'>Date: {date}</p>
        </div>
        <p className='my-2 '>{description}</p>
        <button 
        onClick={handleJoinEvent}
        className='bg-[#7F56D9] hover:bg-[#6941c6] my-2 px-4 py-2 rounded-md text-base text-white font-semibold transition-all ease-in-out duration-150'>Join Event</button>
    </div>
  )
}

export default EventComponent