import { Server } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_SECRET } from './config/jwt';
import { User } from './models/User';

const eventParticipants = new Map<string, { username: string; socketId: string }[]>();

const getUsernameById = async (userId: string): Promise<string | null> => {
  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(userId).select('username');
    return user ? user.username : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setupWebSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.emit('message', `${socket.id} connected to the server!`);

    // user joined event -----------------------------------

    socket.on('joinEventRoom', async (eventId: string) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        socket.emit('unauthorized', 'You must be logged in to join an event');
        return;
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const username = await getUsernameById(decoded.userId); 

        if (!username) {
          socket.emit('error', 'User not found');
          return;
        }
        if (!eventParticipants.has(eventId)) {
          eventParticipants.set(eventId, []);
        }
        const participants = eventParticipants.get(eventId)!;

           // Remove the user if they already exist (to handle reconnections)
          const existingUserIndex = participants.findIndex((p) => p.username === username);
          if (existingUserIndex !== -1) {
            participants.splice(existingUserIndex, 1);
          }

          // Add the user with their new socket.id
          participants.push({ username, socketId: socket.id });

              socket.join(eventId);
              console.log(`User ${username} joined event room: ${eventId}`);
              console.log('Current eventParticipants:', eventParticipants);
              io.to(eventId).emit('updateParticipants', participants.map(p => p.username));
            } catch (error) {
              socket.emit('unauthorized', 'Invalid token');
            }
          });

    // user sent message in event room ----------------------------

    socket.on('sendMessage', (eventId, message, sender) => {
      console.log('eventParticipants on sendMessage:', eventParticipants);

      const messageData = { sender, message, timestamp: new Date().toISOString() };
      console.log('sending message data:', messageData);

      // Broadcast the message to all clients in the event room
      io.to(eventId).emit('receiveMessage', messageData);
    });

    // user disconnect ------------------

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
      eventParticipants.forEach((participants, eventId) => {
        const index = participants.findIndex(p => p.socketId === socket.id);
        if (index !== -1) {
          const username = participants[index].username;
          participants.splice(index, 1); // Remove user

          console.log(`User ${username} left event room: ${eventId}`);

          // Emit updated participants list
          io.to(eventId).emit('updateParticipants', participants.map(p => p.username));

          // Cleanup empty event rooms
          if (participants.length === 0) {
            eventParticipants.delete(eventId);
          }
        }
      });
    });
  });
};