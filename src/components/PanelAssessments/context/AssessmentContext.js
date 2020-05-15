import React, { useState, createContext } from 'react';

export const AssessmentContext = createContext();

export default function AssessmentProvider({ children }) {
  
  const currentAssessmentController = useState({});
  const viewController = useState('show');

  const state = {
    currentAssessmentController,
    viewController
  }

  return (
    <AssessmentContext.Provider value={state}>
      {children}
    </AssessmentContext.Provider>
  );
}