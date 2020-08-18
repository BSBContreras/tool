import React from 'react';
import AssessmentProvider from './context/AssessmentContext';
import AssessmentsList from './components/AssessmentsList'
import RightPanel from './components/RightPanel';

export default function PanelAssessments({ classes }) {
  return (
    <AssessmentProvider>
      <div className={classes.list}>
        <AssessmentsList /> 
      </div>
      <div className={classes.content}>
        <RightPanel />
      </div>
    </AssessmentProvider>
  );
}
