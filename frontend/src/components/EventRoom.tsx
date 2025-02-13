import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import toast, { Toaster, Toast } from 'react-hot-toast';
import { User2Icon } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { CustomToast } from "./ui/CustomToast";

interface EventRoomProps {
  token: string; 
  title: string; 
  description: string; 
  creator: string;
  id: string;
}

const EventRoom: React.FC = () => {
  const {user } = useUser();
  const location = useLocation();
  const { id, title, description, creator, token } = location.state as EventRoomProps;
  const eventId = id; 
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; message: string; timestamp: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const [attendees, setAttendees] = useState<string[]>([]);
  const [eventDetails, setEventDetails] = useState<{ title: string; description: string; creator: string } | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const socket: Socket = io(URL, {
    auth: { token },
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  useEffect(() => {
    if (!token) {
      setMessage("Unauthorized: No token provided");
      return;
    }

    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${URL}/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEventDetails(data);
      } catch (error: any) {
        setMessage(error.message);
      }
    };

    fetchEventDetails();

    console.log("Socket connected:", socket.id);

    socket.emit("joinEventRoom", eventId);

    socket.on("message", (msg: string) => {
      console.log("New message:", msg);
    });

    socket.on("updateParticipants", (usernames: string[]) => {
      console.log("Updated participants:", usernames);
      setAttendees([...usernames]); // Replace the entire list
      toast.custom((t:Toast) => <CustomToast t={t} username={usernames[usernames.length - 1]} />);
    });

    socket.on("unauthorized", (error: string) => {
      setMessage(error);
    });

    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [eventId, token]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      socket.emit('sendMessage', eventId, currentMessage,user?.username);
      setCurrentMessage('')
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      
      <div className="flex w-1/2 min-h-96 border rounded-md p-5 shadow-md">
        <div className="w-2/5 mr-2 border-r">
          {message && (
            <p className="text-red-600 text-sm bg-red-200 p-2 rounded-md">{message}</p>
          )}
          {eventDetails ? (
            <>
              <div className="border-b pb-2 h-16">
                <h1 className="text-2xl font-semibold capitalize">{title}</h1>
                <p className="text-sm font-normal text-foreground/60 py-1">Created by: {creator}</p>
              </div>
              <div className="py-6">
                <p>{description}</p>
              </div>
              
              <div className="px-3 py-1 flex flex-col justify-between">
                <div>
                  <h1 className="text-lg font-semibold">Attendees</h1>
                  {attendees.length === 0 ? (
                    <p className="text-gray-500">No attendees yet.</p>
                  ) : (
                    <ul className="text-sm font-normal text-blue-500 list-disc list-inside">
                      {attendees.map((attendee) => (
                        <li key={attendee}>{attendee}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button variant="destructive" onClick={() => { navigate("/events"); }} className="mt-4">Leave Event</Button>
              </div>
            </>
          ) : (
            <p className="text-center">Loading event details...</p>
          )}
        </div>
        <div className="h-72 flex flex-col px-10 py-2">
          <h1 className="border-b text-xl font-medium pb-2">Chat</h1>
          <div className="flex flex-col space-y-2 overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md text-foreground ${msg.sender === 'You' ? 'bg-background self-end' : 'bg-background self-start'}`}>
                <div className="flex gap-1 items-center">
                    <User2Icon className="border p-1 rounded-lg h-10 w-10"/>
                  <div>
                    <div className="flex gap-1 items-center">
                      <p className="text-sm font-semibold">{msg.sender}</p>
                      <p className="text-xs text-foreground/60">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                    </div>
                      <p>{msg.message}</p>
                    </div>
                  </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2 w-full">
            <input 
              type="text" 
              className="bg-transparent border-foreground border rounded-md w-full" 
              value={currentMessage} 
              onChange={(e) => setCurrentMessage(e.target.value)} 
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRoom;