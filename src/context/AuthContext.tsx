import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { currentUser } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'client' | 'barber') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate fetching user on initial load
  useEffect(() => {
    // In a real app, you'd check for a token and fetch the user
    // For now, we'll use our mock data
    setTimeout(() => {
      setUser(currentUser);
      setIsLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(currentUser);
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    // Clear user data
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, role: 'client' | 'barber') => {
    // Simulate API call
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: 'new-user-id',
          name,
          email,
          role,
        };
        setUser(newUser);
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};