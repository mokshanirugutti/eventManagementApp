import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import { setupWebSocket } from './websocket';
import { connectDB } from './db/db';
import authRoute from './routes/auth';
import eventRoute from './routes/events';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup WebSocket
setupWebSocket(io);

// Routes
app.use('/auth', authRoute);
app.use('/events', eventRoute);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
