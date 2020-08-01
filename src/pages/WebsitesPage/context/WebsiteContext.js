import React, { useState, createContext } from 'react';

export const WebsiteContext = createContext();

export default function WebsiteProvider({ children }) {
  
  const websiteController = useState({});

  const value = {
    websiteController
  }

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}