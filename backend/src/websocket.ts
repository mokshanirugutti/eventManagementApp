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

        if (!participants.some((p) => p.socketId === socket.id)) {
          participants.push({ username, socketId: socket.id });
        }


        socket.join(eventId);
        console.log(`User ${username} joined event room: ${eventId}`);
        io.to(eventId).emit('message', participants.map(p => p.username));
      } catch (error) {
        socket.emit('unauthorized', 'Invalid token');
      }
    });

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
