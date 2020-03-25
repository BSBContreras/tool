import React from 'react';

import PanelAssessments from './PanelAssessments';
import PanelQuestionnaire from './PanelQuestionnaire';

// const PanelQuestionnaire = () => <h2>Area reserved to Panel Questionnaire</h2>;

export default function Main({ page }) {
  const PageView = {
    'assessments': <PanelAssessments />,
    'questionnaires': <PanelQuestionnaire />
  }

  return PageView[page];
}
