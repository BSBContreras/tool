import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  
  const managerController = useState({});

  const value = {
    managerController
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
