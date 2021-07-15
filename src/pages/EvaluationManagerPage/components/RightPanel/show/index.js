import React, { useState, useContext } from 'react';

import Typography from '@material-ui/core/Typography';

import ShowEvaluators from './ShowEvaluators';
import ShowQuestionnaire from './ShowQuestionnaire';
import ShowTasks from './ShowTasks';
import ShowGeneral from './ShowGeneral';

import { AssessmentContext } from '../../../context/AssessmentContext';
import SelectAssessmentSvg from '../../../../../assets/instant_information.svg'

import { makeStyles } from '@material-ui/core/styles';

import Tabs from '../../../../../components/Tabs'; 

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    color: '#444'
  },
  svg: {
    maxHeight: '350px'
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  containerRoot: {
    height: '100%', 
    padding: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(1),
    height: 'calc(100% - 45px)'
  }
}));

export default function ShowEvaluationPanel() {
  
  const controller = useContext(AssessmentContext);
  const [evaluation] = controller.currentAssessmentController;
  const [view, setView] = controller.viewController;

  const handleCreateAssessment = () => {
    if(view !== 'create') {
      setView('create');
    }
  }

  const getTab = () => {
    return [
      'General', 
      'Tasks',
      'Questionnaire',
      'View Evaluators'
    ]
  }

  const getPanel = (index) => {
    switch(index) {
      case 0: return <ShowGeneral />; 
      case 1: return <ShowTasks />;
      case 2: return <ShowQuestionnaire />;
      case 3: return <ShowEvaluators />;
      default: return <>Not Found</>;
    }
  }

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return evaluation.id ? 
    (
      <div className={classes.containerRoot}>
        <div className={classes.tabs}>
          <Tabs
            value={value}
            handleChange={handleChange}
            tabs={getTab()}
          />
        </div>
        <div className={classes.content}> 
          {getPanel(value)} 
        </div>
      </div>
  ) : (
    <div className={classes.container}>
      <Typography 
        className={classes.title}
        variant="h4"
      >
        Select a Evaluation on the Left
      </Typography>
      <img 
        className={classes.svg}
        src={SelectAssessmentSvg} 
        alt="Select some evaluation" 
      /> 
      <Typography 
        className={classes.link}
        variant="subtitle1"
        onClick={handleCreateAssessment}
      >
        Or Click here to add a New Evaluation
      </Typography>
    </div>
  )
}
