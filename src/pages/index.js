import React, { useContext, useState } from 'react';
import LoginPage from './LoginPage';
import QuestionnairePage from './QuestionnairePage';
import EvaluationManagerPage from './EvaluationManagerPage';
import WebsitesPage from './WebsitesPage';

import { Header, Footer } from '../components/Layouts';

import { GlobalContext } from '../context/GlobalContext';

export default function Pages() {
  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  const [page, setPage] = useState('EvaluationManagerPage');

  const showPage = (pageName) => {
    switch (pageName) {
      case 'QuestionnairePage': 
        return <QuestionnairePage />
      case 'EvaluationManagerPage':
        return <EvaluationManagerPage />
      case 'WebsitesPage': 
        return <WebsitesPage />
      default: 
        return <div>404 page not found</div>
    }
  }

  return (
    <div>
      {manager.id ? (
        <div>
          <Header setPage={setPage} />
          {showPage(page)}
          <Footer /> 
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  )
}
