import { useUser } from '@/context/UserContext';
import { EventComponentProps } from '@/types'
import { ClipboardEditIcon, EllipsisVertical, Trash2Icon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import deleteEvent from '@/hooks/deleteEvent';

const EventComponent : React.FC<EventComponentProps> = ({id, title, date, creator,description,onDelete}) => {
  const {user } = useUser();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleJoinEvent = () => {

    if (!token) {
      alert('You must be logged in to join an event.');
      return;
    }

    // Navigate to event room with eventId and token as query params
    navigate(`/event/${id}`, { state: { token,title,description,creator,id } });
  };

  const handleDelete = async () => {
    if (token) {
      const success = await deleteEvent({ id, token });
      if (success) {
        onDelete(id); 
      }
    }
  }

  const handleEdit = () => {
    navigate(`/edit-event/${id}`);
  }

  return (
    <div className='border px-5 py-2 mx-auto w-72 rounded-md my-2'>
        <div className='flex gap-2 items-center justify-between'>
            <div>
                <h2 className='text-2xl '>{title}</h2>
                <p className='text-sm text-gray'>{creator}</p>
            </div>
            {user?.username === creator &&
                <MenuOptions handleDelete={handleDelete} handleEdit={handleEdit}/>  
            }
        </div>
        <p className='text-sm'>Date: {date}</p>
        <p className='my-2 '>{description}</p>
        <button 
        onClick={handleJoinEvent}
        className='bg-[#7F56D9] hover:bg-[#6941c6] my-2 px-4 py-2 rounded-md text-base text-white font-semibold transition-all ease-in-out duration-150'>Join Event</button>
    </div>
  )
}

export default EventComponent

interface MenuOptionsProps {
  handleDelete: () => void;
  handleEdit : () => void;
}


const MenuOptions : React.FC<MenuOptionsProps> = ({ handleDelete, handleEdit }) => {
  return (
    <DropdownMenu >
    <DropdownMenuTrigger asChild className='w-10'>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full shadow-none "
        aria-label="Open edit menu"
      >
        <EllipsisVertical size={16} strokeWidth={2} aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='' >
      <DropdownMenuItem className='flex justify-between' onClick={handleEdit}>Edit <ClipboardEditIcon/></DropdownMenuItem>
      <DropdownMenuItem className='text-red-400' onClick={handleDelete}>Delete <Trash2Icon/></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}