import React, { useContext } from 'react';
import LoginPage from './LoginPage';
import QuestionnairePage from '../components/PanelQuestionnaire';

import { GlobalContext } from '../context/GlobalContext';

export default function Pages() {
  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  return (
    <div>
      {manager.id ? (
        <QuestionnairePage />
      ) : (
        <LoginPage />
      )}
    </div>
  )
}
