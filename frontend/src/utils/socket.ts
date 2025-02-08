import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: localStorage.getItem('token'), // Get token from localStorage
  },
});

export default socket;
