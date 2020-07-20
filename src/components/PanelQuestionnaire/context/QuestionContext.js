import React, { useState, createContext, useEffect } from 'react';
import api from '../../../services/api';

export const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
  
  const [answerTypes, setAnswerTypes] = useState([]);
  const [criteria, setCriteria] = useState([]);

  const loadAnswerTypes = async () => {
    const response = await api.post('/answer_types/index.php');

    const { data } = response;
    if(data.status === 'success') {
      setAnswerTypes(data.docs);
    } else {
      alert('Error on load answer types');
    }
  }

  const loadCriteria = async () => {
    const response = await api.post('/criteria/index.php');

    const { data } = response;
    if(data.status === 'success') {
      setCriteria(data.docs);
    } else {
      alert('Error on load criteria');
    }
  }

  useEffect(() => {
    loadAnswerTypes();
    loadCriteria();
  }, [])

  const value = {
    answerTypes,
    criteria
  }

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
