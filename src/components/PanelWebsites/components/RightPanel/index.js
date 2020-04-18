import React, { useContext } from 'react';
import Show from './show'; 
// import Create from './create';
import { WebsiteContext } from '../../context/WebsiteContext';

const Create = () => <div>Create</div>

export default function RightPanel() {

  const { viewController } = useContext(WebsiteContext);
  const [ view ] = viewController;

  const ViewMode = {
    'show': <Show />,
    'create': <Create />
  }

  return ViewMode[view];
}
