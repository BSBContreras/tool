import React, { useState, createContext } from 'react';

export const QuestionnaireContext = createContext();

export default function QuestionnaireProvider({ children }) {
  
  const questionnaireController = useState({});

  const value = {
    questionnaireController
  }

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}
