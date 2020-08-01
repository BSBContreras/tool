import React, { useState, createContext } from 'react';

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  
  const taskController = useState({});
  const pagesController = useState([]);
  const newPageAddController = useState(false);
  const newTaskAddController = useState(false);

  const value = {
    taskController,
    pagesController,
    newPageAddController,
    newTaskAddController
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}