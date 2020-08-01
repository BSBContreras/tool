import React, { useContext } from 'react';
import Show from './show';
import Create from './create';
import CreateAssessmentProvider from '../../context/CreateAssessmentContext';
import { AssessmentContext } from '../../context/AssessmentContext';

export default function RightPanel() {

  const { viewController } = useContext(AssessmentContext);
  const [ view ] = viewController;

  const ViewMode = {
    'show': <Show />,
    'create': 
    <CreateAssessmentProvider>
      <Create />
    </CreateAssessmentProvider>
  }

  return ViewMode[view];
}
