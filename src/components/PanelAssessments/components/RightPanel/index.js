import React, { useContext } from 'react';
import Show from './show';
import Create from './create';
import { AssessmentContext } from '../../context/AssessmentContext';

export default function RightPanel() {

  const { viewController } = useContext(AssessmentContext);
  const [ view ] = viewController;

  const ViewMode = {
    'show': <Show />,
    'create': <Create />
  }

  return ViewMode[view];
}
