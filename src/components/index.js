import React from 'react';

import PanelAssessments from './PanelAssessments';
// import PanelQuestionnaire from './PanelQuestionnaire';
// import PanelWebsites from './PanelWebsites';

const PanelQuestionnaire = () => <h2>Area reserved to Panel Questionnaire</h2>;
// const PanelAssessments = () => <h2>Area reserved to Panel Assessment</h2>;
const PanelWebsites = () => <h2>Area reserved to Panel Websites</h2>;

export default function Main({ page }) {
  const PageView = {
    'assessments': <PanelAssessments />,
    'questionnaires': <PanelQuestionnaire />,
    'websites': <PanelWebsites />
  }

  return PageView[page];
}
