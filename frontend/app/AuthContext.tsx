"use client"; // Mark this file as a Client Component

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string) => void; // Accept access token as a parameter
  logout: () => void;
  logoutMessage: string; // Add logout message state
  setLogoutMessage: (message: string) => void; // Function to set logout message
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        setIsAuthenticated(true); // User is authenticated
    }
  }, []);

  const login = (accessToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', accessToken); // Store actual access token in local storage
  };

  const logout = () => {
    setIsAuthenticated(false); // Clear user data
    localStorage.removeItem('accessToken'); // Remove token from local storage
    setLogoutMessage("Logged out successfully."); // Set logout message
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, logoutMessage, setLogoutMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};