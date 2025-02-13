import { useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@/context/UserContext';

interface SocketEventHandlers {
  onMessage?: (msg: string) => void;
  onUpdateParticipants?: (usernames: string[]) => void;
  onUnauthorized?: (error: string) => void;
  onReceiveMessage?: (messageData: { sender: string; message: string; timestamp: string }) => void;
}

export const useSocket = (url: string, token: string, eventId: string, eventHandlers: SocketEventHandlers) => {
  const { user } = useUser();

  const socket: Socket = io(url, {
    auth: { token },
  });

  useEffect(() => {
    if (!token) return;

    socket.emit('joinEventRoom', eventId);

    if (eventHandlers.onMessage) socket.on('message', eventHandlers.onMessage);
    if (eventHandlers.onUpdateParticipants) socket.on('updateParticipants', eventHandlers.onUpdateParticipants);
    if (eventHandlers.onUnauthorized) socket.on('unauthorized', eventHandlers.onUnauthorized);
    if (eventHandlers.onReceiveMessage) socket.on('receiveMessage', eventHandlers.onReceiveMessage);

    return () => {
      socket.disconnect();
    };
  }, [token, eventId, socket, eventHandlers]);

  const sendMessage = useCallback((message: string) => {
    if (message.trim()) {
      socket.emit('sendMessage', eventId, message, user?.username);
    }
  }, [socket, eventId, user]);

  return { sendMessage };
};