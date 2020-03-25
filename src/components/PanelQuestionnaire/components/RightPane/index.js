import React, { useState } from 'react';
import Show from './Show';
import Edit from './Edit';
import Create from './Create';

export default function RightPane({ view, changeView, questions, questionnaire, loadQuestions, loadQuestionnaires, setCurrentQuestionnaire }) {

  const [editQuestion, setEditQuestion] = useState(null);

  const edit = question => {
    setEditQuestion(question);
    changeView(2);
  }

  const Mode = [
    <Show questions={questions} questionnaire={questionnaire} />,
    <Edit 
      questions={questions} 
      questionnaire={questionnaire} 
      loadQuestions={loadQuestions} 
      editQuestion={edit}
      changeView={changeView}
      loadQuestionnaires={loadQuestionnaires}
      setCurrentQuestionnaire={setCurrentQuestionnaire}
    />,
    <Create editQuestion={editQuestion} />
  ]

  return (
    <>
      {Mode[view]}
    </>
  );
}