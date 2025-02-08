import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface EventRoomProps {
  eventId: string;
  token: string; // Accept token as a prop
}

const EventRoom: React.FC<EventRoomProps> = ({ eventId, token }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [attendees, setAttendees] = useState<string[]>([]); // State to hold attendees

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000', {
      auth: { token },
    });

    console.log('Socket connected:', socket.id);

    socket.emit('joinEventRoom', eventId);

    socket.on('message', (msg: string) => {
      console.log(msg);
      setNotifications((prev) => [...prev, msg]);
    });

    socket.on('updateParticipants', (usernames: string[]) => {
      console.log('Updated participants:', usernames);
      setAttendees(usernames);
    });

    socket.on('unauthorized', (error: string) => {
      setMessage(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [eventId, token]);

  return (
    <div>
      {message && <p>{message}</p>}
      <div>Joined event room: {eventId}</div>
      <div>
        <h3>Current Attendees:</h3>
        {attendees.map((attendee) => (
          <p key={attendee}>{attendee}</p>
        ))}
      </div>
      <div>
        <h3>Notifications:</h3>
        {notifications.map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
      </div>
    </div>
  );
};

export default EventRoom;
