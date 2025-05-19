import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
  clearError: () => {},
  updateUserProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem('marketingProUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data', e);
        localStorage.removeItem('marketingProUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Check stored users
      const users = JSON.parse(localStorage.getItem('marketingProUsers') || '[]');
      const user = users.find((u: any) => u.email === email);

      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('marketingProUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Validate input
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('marketingProUsers') || '[]');
      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: uuidv4(),
        name,
        email,
        password,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      // Store user in users list
      users.push(newUser);
      localStorage.setItem('marketingProUsers', JSON.stringify(users));

      // Store current user session
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('marketingProUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('No user logged in');
      }

      // Update user in users list
      const users = JSON.parse(localStorage.getItem('marketingProUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      localStorage.setItem('marketingProUsers', JSON.stringify(users));

      // Update current user session
      const { password: _, ...userWithoutPassword } = updatedUser;
      localStorage.setItem('marketingProUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      return userWithoutPassword;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('marketingProUser');
    setUser(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        error,
        clearError,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};