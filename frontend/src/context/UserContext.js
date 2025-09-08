// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export { UserContext };

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user data on app startup
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout(); // Clear invalid data
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, rememberMe = false) => {
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(userData));
    
    // Clear the other storage
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem('user');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    // No need to clear cart from localStorage anymore since we use backend
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    // Update stored data
    const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(updatedUserData));
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isLoggedIn: isLoggedIn(),
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
