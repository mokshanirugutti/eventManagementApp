import express from 'express';
import dotenv from 'dotenv';


import http from 'http';
import { Server } from 'socket.io';


import { connectDB } from './db/db';
import authRoute from './routes/auth';
import eventRoute from './routes/events';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (update this in production)
    methods: ['GET', 'POST'],
  },
});



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    
      socket.emit("message", "connected");

    // Join a specific event room
    socket.on('joinEventRoom', (eventId: string) => {
      socket.join(eventId);
      console.log(`User ${socket.id} joined event room: ${eventId}`);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

// Routes
app.use('/auth', authRoute);
app.use('/events', eventRoute);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
  });