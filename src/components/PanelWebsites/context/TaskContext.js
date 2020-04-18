import React, { useState, createContext } from 'react';

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  
  const taskController = useState({});
  const pagesController = useState([]);

  const value = {
    taskController,
    pagesController
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}