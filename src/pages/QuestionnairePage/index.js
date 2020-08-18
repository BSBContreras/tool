import React from 'react';
import QuestionnaireProvider from './context/QuestionnaireContext';
import QuestionnaireList from './components/QuestionnaireList';
import RightPanel from './components/RightPanel';

export default function PanelQuestionnaires({ classes }) {
  return (
    <QuestionnaireProvider>
      <div className={classes.list}>
        <QuestionnaireList />
      </div>
      <div className={classes.content}>
        <RightPanel />
      </div>
    </QuestionnaireProvider>
  );
}
