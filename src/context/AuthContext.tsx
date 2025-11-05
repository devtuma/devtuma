import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    phone: '+55 11 99999-9999',
    country: 'BR',
    document: '123.456.789-00',
    verified: true,
    rating: 4.8,
    totalTransactions: 15,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: '123456',
    phone: '+244 923 456 789',
    country: 'AO',
    document: '123456789XX123',
    verified: true,
    rating: 4.9,
    totalTransactions: 12,
    createdAt: new Date('2024-02-20'),
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      verified: false,
      rating: 0,
      totalTransactions: 0,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
