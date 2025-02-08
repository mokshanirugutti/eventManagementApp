// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserContextType } from '@/types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data: { user: User; token: string } = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: { user: User; token: string } = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
