import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Add as AddIcon } from '@material-ui/icons';

import { AssessmentContext } from '../../context/AssessmentContext';
import { loadEvaluationsByManager } from '../../../../routes';
import { GlobalContext } from '../../../../context/GlobalContext';
import { RUNTIME_ERROR } from '../../../../constants';

const AssessmentItem = ({ assessment }) => {

  const { currentAssessmentController, viewController } = useContext(AssessmentContext);
  const [currentAssessment, setCurrentAssessment] = currentAssessmentController;
  const [view, setView] = viewController;

  const handleCurrentAssessment = () => {
    if (currentAssessment !== assessment) {
      setCurrentAssessment(assessment);
      if(view !== 'show') {
        setView('show');
      }
    }
  }

  return (
    <ListItem 
      button 
      onClick={handleCurrentAssessment}
      selected={assessment === currentAssessment}
    >
      <ListItemText 
        primary={assessment.name}
        secondary={assessment.detail}
      />
    </ListItem>
  );
}

const CreateAssessment = () => {

  const { currentAssessmentController, viewController } = useContext(AssessmentContext);
  const [currentAssessment, setCurrentAssessment] = currentAssessmentController;
  const [view, setView] = viewController;

  const handleAddAssessment = () => {
    if(view !== 'create') {
      setView('create');
      if(currentAssessment !== null) {
        setCurrentAssessment(null);
      }
    }
  };

  return (
    <ListItem button onClick={handleAddAssessment}>
      <ListItemText 
        primary="Add new Evaluation"
        secondary="Click here to add a new evaluation"
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleAddAssessment}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default function AssessmentList() {

  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    loadEvaluationsByManager({
      manager_id: manager.id
    }).then(json => {

      setAssessments(json);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Evaluations');
      }

    })
  }, [manager, currentAssessment]);

  return (
    <List component="nav">
      <CreateAssessment />
      {assessments.map(assessment => (
        <AssessmentItem key={assessment.id} assessment={assessment} button />
      ))}
    </List>
  );
}