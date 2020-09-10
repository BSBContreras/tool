import React, { useContext, useState } from 'react';
import LoginPage from './LoginPage';
import QuestionnairePage from './QuestionnairePage';
import EvaluationManagerPage from './EvaluationManagerPage';
import WebsitesPage from './WebsitesPage';

import { Header } from '../components/Layouts';

import { GlobalContext } from '../context/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  
    display: 'grid',
    gridTemplateColumns: '300px auto',
    gridTemplateRows: '70px auto',
    gridTemplateAreas: `
      'HE HE'
      'LI CO' 
    `
  },
  list: {
    gridArea: 'LI',
    overflowY: 'auto',
    borderRight: '1px solid lightgrey',
    height: 'calc(100vh - 70px)'
  },
  content: {
    gridArea: 'CO',
    height: 'calc(100vh - 70px)'
  }
}))

export default function Pages() {
  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  const [page, setPage] = useState('EvaluationManagerPage');

  const classes = useStyles();

  const showPage = (pageName) => {
    switch (pageName) {
      case 'QuestionnairePage': 
        return <QuestionnairePage classes={classes} />
      case 'EvaluationManagerPage':
        return <EvaluationManagerPage classes={classes} />
      case 'WebsitesPage': 
        return <WebsitesPage classes={classes} />
      default: 
        return <div>404 page not found</div>
    }
  }

  return (
    <>
      {manager.id ? (
        <div className={classes.container}>
          <Header setPage={setPage} />
          {showPage(page)}
        </div>          
      ) : (
        <LoginPage />
      )}
    </>
  )
}
