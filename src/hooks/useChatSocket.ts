
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';

export const useChatSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In a real app, this would connect to your actual Socket.IO server
      // For demo purposes, we'll simulate a connection
      const mockSocket = {
        on: (event: string, callback: Function) => {
          // Store event listeners for demo
        },
        off: (event: string) => {
          // Remove event listeners for demo
        },
        emit: (event: string, data: any) => {
          console.log(`Mock emit: ${event}`, data);
          // In real app, this would send data to server
        },
        connected: true
      } as any;

      setSocket(mockSocket);
      setIsConnected(true);

      // Simulate connection status changes
      const interval = setInterval(() => {
        setIsConnected(prev => {
          // Randomly simulate connection issues for demo
          return Math.random() > 0.05; // 95% uptime
        });
      }, 5000);

      return () => {
        clearInterval(interval);
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [user]);

  return { socket, isConnected };
};
