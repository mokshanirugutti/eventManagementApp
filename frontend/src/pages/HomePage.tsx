import {  Calendar } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';


const HomePage: React.FC = () => {
  return (
    <div className='pagePadding min-h-screen flex justify-center items-center '>
      <div className='max-w-2xl mx-auto flex flex-col gap-4 text-center'>
        <h1 className='text-4xl font-bold '>Find Events to Join</h1>
        <p className='mt-2 text-lg text-foreground/60'>Join events and meet new people in your community.</p>
        
        <Link to={'/events'} className='w-fit mx-auto'>
          <button className='bg-[#7F56D9] hover:bg-[#6941c6] px-6 py-3 rounded-md text-lg text-white font-semibold transition-all ease-in-out duration-150 flex items-center justify-center'>
            <Calendar className='mr-2' /> {/* Adding an icon */}
            View Events
          </button>
        </Link>

        
      </div>

      
    </div>
  );
}

export default HomePage;