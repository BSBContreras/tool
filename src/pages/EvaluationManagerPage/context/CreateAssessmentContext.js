import React, { useState, createContext } from 'react';

export const CreateAssessmentContext = createContext();

export default function CreateAssessmentProvider({ children }) {
  
  const detailsController = useState({ name: '', detail: '' });
  const questionnaireController = useState({});
  const tasksController = useState([]);
  const userListController = useState([]);

  const state = {
    detailsController,
    questionnaireController,
    tasksController,
    userListController
  }

  return (
    <CreateAssessmentContext.Provider value={state}>
      {children}
    </CreateAssessmentContext.Provider>
  );
}
