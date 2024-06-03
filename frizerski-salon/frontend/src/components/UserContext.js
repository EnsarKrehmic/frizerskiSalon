// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3307/api/user-profile')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user information', error));
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};