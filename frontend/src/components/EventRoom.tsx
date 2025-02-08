import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";

interface EventRoomProps {
  token: string; 
  title: string; 
  description: string; 
  creator: string;
  id: string;
}

const EventRoom: React.FC = () => {
  const location = useLocation();
  const { id, title, description, creator, token } = location.state as EventRoomProps;
  const eventId = id; 
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string | null>(null); // Single notification
  const [attendees, setAttendees] = useState<string[]>([]);
  const [eventDetails, setEventDetails] = useState<{ title: string; description: string; creator: string } | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

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

    const socket: Socket = io(URL, {
      auth: { token },
    });

    console.log("Socket connected:", socket.id);

    socket.emit("joinEventRoom", eventId);

    socket.on("message", (msg: string) => {
      console.log("New message:", msg);
      setNotifications(msg); // Replace old message
      setTimeout(() => setNotifications(null), 3000); // Auto-hide after 3s
    });

    socket.on("updateParticipants", (usernames: string[]) => {
      console.log("Updated participants:", usernames);
      setAttendees([...usernames]); // Replace the entire list
    });

    socket.on("unauthorized", (error: string) => {
      setMessage(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [eventId, token]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex w-96 border rounded-md p-5 shadow-md">
        <div className="w-4/5 mr-2 border-r">
          {message && (
            <p className="text-red-600 text-sm bg-red-200 p-2 rounded-md">{message}</p>
          )}
          {eventDetails ? (
            <>
              <div className="border-b pb-2">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm font-normal text-foreground/60">Created by: {creator}</p>
              </div>
              <div>
                <p>{description}</p>
              </div>
            </>
          ) : (
            <p className="text-center">Loading event details...</p>
          )}
        </div>
        <div className="px-3 py-1">
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
        <Button variant="destructive" onClick={() => { navigate("/events"); }} className="mt-4">Leave Event</Button>
        </div>
      </div>

      {/* Notifications */}
      {notifications && (
        <div className="bg-blue-100 text-blue-700 p-3 rounded-md text-center mt-4">
          {notifications}
        </div>
      )}
    </div>
  );
};

export default EventRoom;