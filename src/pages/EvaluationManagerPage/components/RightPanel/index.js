import React, { useContext } from 'react';
import Show from './show';
import CreateEvaluation from './CreateEvaluation';
import CreateAssessmentProvider from '../../context/CreateAssessmentContext';
import { AssessmentContext } from '../../context/AssessmentContext';

export default function RightPanel() {

  const { viewController } = useContext(AssessmentContext);
  const [ view ] = viewController;

  const ViewMode = {
    'show': <Show />,
    'create': 
    <CreateAssessmentProvider>
      <CreateEvaluation />
    </CreateAssessmentProvider>
  }

  return ViewMode[view];
}
